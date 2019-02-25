/**
 * 用户详情页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/userFace.html',
        '../actions/userAction'
    ],
    function (tem, UserAction) {
        var UserFaceView = fish.View.extend({
            el:false,
            template:tem,
            events:{
                'click #saveFace':'saveFace',
                'click #faceLogin':'faceLogin'
            },
            mediaStreamTrack:null,
            context:null,
            canvas:null,
            video:null,
            initialize: function () {
                var that = this;
            },
            afterRender : function () {
                var that = this;
                if (that.options.userAccount != null){
                    that.$("#userId").val(that.options.userAccount);
                }
                that.loadCamera();
            },
            loadCamera : function () {
                var that = this;
                that.canvas = that.$('canvas')[0];
                that.context = that.canvas.getContext('2d');
                that.video = that.$('video')[0];
                //媒体对象
                navigator.getMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia;
                navigator.getMedia({
                    video: true //使用摄像头对象
                }, function (stream) {
                    that.mediaStreamTrack = stream.getTracks()[0];
                    that.video.src = (window.URL || window.webkitURL).createObjectURL(stream);
                    that.video.play();
                }, function (error) {
                    console.log(error);
                });
                that.$("#upload").click(function (e) {
                    that.context.drawImage(that.video, 0, 0, 200, 150);
                });
                that.$("#closeFace").click(function (e) {
                    that.mediaStreamTrack && that.mediaStreamTrack.stop();
                })

            },
            //人脸识别参考文档：https://cloud.baidu.com/doc/FACE/
            faceLogin : function () {
                var that = this;
                if (that.$("#userId").val() == null){
                    fish.error("未填写账号！");
                    return false;
                }
                var param = {};
                param.image = that.canvas.toDataURL('image/jpg');
                param.userId = that.$("#userId").val();
                param.groupId = "face_group_1";
                UserAction.faceLogin(param, function (result) {
                    if (result && result.resultCode == 1 ){
                        if (result.resultObject.result.user_list[0].score >= 90){
                            // fish.success("登录成功!");
                            that.loadUserInfo(param.userId);
                        } else {
                            fish.info("人脸相似度："+ result.resultObject.result.user_list[0].score + "请重试!");
                        }
                    }else fish.error(result.resultObject.error_msg);
                });
            },
            loadUserInfo : function (userAccount) {
                var that = this;
                var param = {userAccount:userAccount};
                UserAction.getUserInfo(param, function (result) {
                    if (result && result.resultCode == 1) {
                        window.sessionStorage.setItem("User",result.resultObject.userAccount);
                        window.sessionStorage.setItem("Name",result.resultObject.userName);
                        window.sessionStorage.setItem("Able",result.resultObject.userState);
                        window.sessionStorage.setItem("Lv",result.resultObject.userType);//用户权限等级
                        window.sessionStorage.setItem("ComCode",result.resultObject.userComcode);//用户所属组织
                        window.sessionStorage.setItem("ComName",result.resultObject.userComname);//用户所属组织
                    }
                    that.popup.close();
                    //触发关闭摄像头事件
                    that.mediaStreamTrack && that.mediaStreamTrack.stop();
                })
            },
            saveFace : function () {
                var that = this;
                if (that.$("#userId").val() == null){
                    fish.error("未填写账号！");
                    return false;
                }
                var param = {};
                param.image = that.canvas.toDataURL('image/jpg');
                param.userId = that.$("#userId").val();
                param.groupId = "face_group_1";
                UserAction.addFace(param, function (result) {
                    if (result && result.resultCode == 1){
                        fish.success("保存人脸信息成功");
                        that.mediaStreamTrack && that.mediaStreamTrack.stop();
                        that.popup.close();
                    } else fish.error(result.resultObject.error_msg);
                });
            }
        });
        return UserFaceView;
    });