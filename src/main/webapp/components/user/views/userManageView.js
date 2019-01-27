/**
 * 用户管理页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/userManage.html',
        '../actions/userAction'
    ],
    function (tem, UserAction) {
        var UserManageView = fish.View.extend({
            el:false,
            template:tem,
            events:{
                'click #UserEnable':'enable',
                'click #UserDisable':'disable',
                'click #UserResetPassword':'resetPassword',
                'click #UserCheckOk':'checkOk',
                'click #UserCheckNotOk':'checkNotOk',
                'click #UserResManage':'resManage'
            },
            initialize: function () {
                var that = this;
                that.searchUser();
            },
            afterRender: function () {
                var that = this;
                //注册页面事件
                that.initPageEvents();
            },
            //注册页面事件
            initPageEvents:function(parma){
                var that = this;
                //项目名称查询回车事件
                that.$("#keyword").keydown(function(event) {
                    if (event.keyCode == "13") {
                        that.searchUser();
                    }
                });
            },
            //查询用户
            searchUser:function(){
                var that = this;
                //that.$('#projectList').grid("destroy");
                that.initUserGrid(that.pageIndex,that.pageSize);
            },
            //重新加载当前页
            reloadUsers:function () {
                var that = this;
                var pagination = $('#user-pagination .active').attr("data-page");
                if (pagination == undefined ) pagination = 1;//当前无数据时即分页值为空时，为免查询报错，赋值为1
                that.initUserGrid(pagination,that.pageSize);
            },
            //初始化用户列表
            initUserGrid:function(pageNum,pageSize){
                var that = this;
                var params = {};
                params.pageIndex = pageNum;
                params.pageSize = pageSize;

                if(that.$("#keyword").val() !=''){
                    params.userName = that.$("#keyword").val();
                }
                $.blockUI({message: '请稍后'});

                that.$("#UserList").html("");
                that.$("#UserList").grid("destroy");
                //初始化grid
                UserAction.getUserList(params,function (result){
                    $.unblockUI();
                    if(result && result.resultCode==0){
                        if(result.resultObject.userLists!=null  && result.resultObject.userLists != ""  ){
                            that.$("#UserList").grid({
                                data: result.resultObject.userLists,
                                height: 'auto',
                                colModel:[
                                    {name:'userAccount', label:'用户名',    width: 80, sortable: false},
                                    {name:'userName',    label:'真实身份',  width: 80, sortable: false},
                                    {name:'userPhone',   label:'手机号',    width: 80, sortable: false},
                                    {name:'userEmail',   label:'邮箱',      width: 80, sortable: false},
                                    {name:'userState',   label:'用户状态',  width: 80, sortable: false},

                                    // {name: 'createDate',   label: '创建日期', width: 80,       sortable: false,
                                    //     formatter: function(cellval, opts, rwdat, _act) {
                                    //         var dateStr = ''
                                    //         if(cellval){  dateStr = fish.dateTsFormatter(cellval);}
                                    //         return dateStr;
                                    //     }
                                    // },
                                    // { name: 'action',      label: '操作',         width: 200,   sortable: false,
                                    //     formatter: function (cellval, opts, rowdata, _act) {
                                    //         return '<div class="btn-group">' +
                                    //             '<button type="button" class="btn btn-link js-edit editProject" data-roleId="'+rowdata.mgrId+'">项目配置</button>' +
                                    //             '</div>'
                                    //     }
                                    // }
                                    ]
                            });
                        } else{
                            that.$("#UserList").append('<div style="text-align:center;"><img src="marketing/css/base/images/none-1.png"'
                                +' style="height:100px;width:124px;text-align:center;margin:20px 0">'
                                +'<p style="width:100%;text-align:center;color:#d0d5e0;">抱歉！暂无数据</p></div>');
                            that.$('#user-pagination').pagination("destroy");
                        }
                        that.userListPage(result.resultObject.pageInfo);//列表分页
                    }else{
                        fish.error(result.resultMsg);
                    }
                });
            },
            //项目列表分页
            userListPage:function(pageInfo){
                var that = this
                that.$('#user-pagination').pagination("destroy");
                that.$('#user-pagination').pagination({
                    total     : pageInfo.pageCount,//总页数
                    records   : pageInfo.total, //查询到数据的总个数
                    displayNum: pageInfo.pageSize,//显示最大有效页数
                    rowNum    : pageInfo.pageSize,//每页显示条数
                    //page      : pageInfo.pageIndex,
                    start     :pageInfo.pageIndex,//设置初始页码
                    pgInput   :true,
                    pgRecText :true,
                    pgTotal   :true,//总计页数
                    rowtext   :null,//每页显示条数
                    onPageClick: function (e, eventData) {
                        that.initUserGrid(eventData.page,eventData.rowNum);
                    }
                });
                that.$('#user-pagination').find(".pagination").css({"margin":"5px 0"});
                //如当前页大于总页数，则置为总页数
                if (pageInfo.pageIndex > pageInfo.pageCount && pageInfo.pageCount)
                    that.initUserGrid(pageInfo.pageCount,pageInfo.pageSize);
            },
            // 生效
            enable : function () {
                var that = this;
                var param = that.$('#UserList').grid("getSelection");
                $.blockUI({message: '请稍后'});
                UserAction.ableUser(param, function (result) {
                    $.unblockUI();
                    if(result && result.resultCode==0){
                        fish.success("生效成功");
                        that.reloadUsers();
                    }else{
                        fish.error(result.resMsg);
                    }
                })
            },
            // 禁用
            disable : function () {
                var that = this;
                var param = that.$('#UserList').grid("getSelection");
                param.admin = window.localStorage.getItem("userAccount");
                $.blockUI({message: '请稍后'});
                UserAction.ableUser(param, function (result) {
                    $.unblockUI();
                    if(result && result.resultCode==0){
                        fish.success("禁用成功");
                        that.reloadUsers();
                    }else{
                        fish.error(result.resMsg);
                    }
                })
            },
            // 重置密码
            resetPassword : function () {
                var that = this;
                var param = that.$('#UserList').grid("getSelection");
                $.blockUI({message: '请稍后'});
                UserAction.resetPassword(param, function (result) {
                    $.unblockUI();
                    if(result && result.resultCode==0){
                        fish.success("重置密码成功");
                        that.reloadUsers();
                    }else{
                        fish.error(result.resMsg);
                    }
                })
            },
            // 审核通过
            checkOk : function () {
                var that = this;
                var param = that.$('#UserList').grid("getSelection");
                param.admin = window.localStorage.getItem("userAccount");
                $.blockUI({message: '请稍后'});
                UserAction.check(param, function (result) {
                    $.unblockUI();
                    if(result && result.resultCode==0){
                        fish.success("审核通过");
                        that.reloadUsers();
                    }else{
                        fish.error(result.resMsg);
                    }
                })
            },
            // 未通过
            checkNotOk : function () {
                var that = this;
                var param = that.$('#UserList').grid("getSelection");
                param.admin = window.localStorage.getItem("userAccount");
                $.blockUI({message: '请稍后'});
                UserAction.check(param, function (result) {
                    $.unblockUI();
                    if(result && result.resultCode==0){
                        fish.success("审核未通过");
                        that.reloadUsers();
                    }else{
                        fish.error(result.resMsg);
                    }
                })
            },
            // 授权管理
            resManage : function () {
                var that = this;
                var param = that.$('#UserList').grid("getSelection");
                param.admin = window.localStorage.getItem("userAccount");
                $.blockUI({message: '请稍后'});
                UserAction.resManage(param, function (result) {
                    $.unblockUI();
                    if(result && result.resultCode==0){
                        fish.success("授权成功");
                        that.reloadUsers();
                    }else{
                        fish.error(result.resMsg);
                    }
                })
            },


            //项目配置---弹出窗口
            editProject:function (){
                var that = this;
                that.is_Click.push(1);
                var selrow = that.$("#projectList").grid("getSelection");
                var param = {};
                param.type="edit";
                param.mgrId = selrow.mgrId;
                if(selrow.statusCd == "审批中"){
                    fish.info("该项目正在审核中");
                    return;
                }
                fish.popupView({
                    url: projectEditView,
                    height: 400,
                    width: "65%",
                    close:function(type){
                        that.reloadProjects();
                    },
                    callback:function(){
                    }
                }).then(function(view){
                    view.setProject(param.mgrId);
                    //view.setParentInput(that);
                });
            },
            //新增项目弹出窗
            addProject:function (){
                var that = this;
                that.is_Click.push(1);
                fish.popupView({
                    url: projectEditView,
                    height: 400,
                    width: "65%",
                    close:function(type){
                        that.reloadProjects();
                    },
                    callback:function(){
                    }
                }).then(function(view){
                    view.setProject(null);
                    //view.setParentInput(that);
                });
            },
            //删除项目
            deleteProject : function(){
                var that = this;
                var selectedProject = that.$("#projectList").grid("getSelection");
                fish.confirm("确认删除项目:" + selectedProject.projectName + "?").result.then(function () {
                    var params = {};
                    params.mgrId = selectedProject.mgrId;
                    params.project = selectedProject;
                    $.blockUI({
                        message: '删除中，请稍后'
                    });
                    projectAction.deleteProject(params, function (result) {
                        $.unblockUI();
                        if (result && result.resultCode == "0") {
                            fish.success("删除成功！");
                            that.reloadProjects();
                        } else {
                            fish.error(result.resultMsg);
                        }
                    });
                });
            },
            //项目成员管理
            projectMember : function(){
                var that = this;
                that.is_Click.push(1);
                var selrow = that.$("#projectList").grid("getSelection");
                var param = {};
                //param.type="add";
                param.mgrId = selrow.mgrId;
                param.statusCd = selrow.statusCd;
                param.projectName = selrow.projectName;
                param.backUrl = "datadevweb/project/views/projectListView";

                that.requireView({
                    url: projectMemberView,
                    viewOption:{
                        mgrId:param.mgrId,
                        projectName:param.projectName,
                        backUrl:param.backUrl
                    }
                });
                that.undelegateEvents();//移除当前view的所有DOM监听事件
            },
            //修改项目状态
            editStatusCd : function(){
                var that = this;
                var selectedProject = that.$("#projectList").grid("getSelection");
                fish.confirm("确认禁用项目： '" + selectedProject.projectName + "' ?").result.then(function () {
                    var params = {};
                    params.mgrId = selectedProject.mgrId;
                    if(selectedProject.statusCdName == "禁用" || selectedProject.statusCd == "00X"){
                        fish.info("对不起，该项目已经禁用");
                        return;
                    };
                    params.statusCd = "00X";
                    params.statusCdName = "禁用";
                    params.project = selectedProject
                    params.clusterId = selectedProject.clusterId;
                    params.paymentType = selectedProject.paymentType;
                    params.projectName = selectedProject.projectName;
                    params.projectDesc = selectedProject.projectDesc;
                    params.dispName = selectedProject.dispName;
                    params.version = selectedProject.version;
                    params.nextVersion = selectedProject.nextVersion;

                    $.blockUI({
                        message: '禁用中，请稍后'
                    });
                    projectAction.updateProject(params, function (result) {
                        $.unblockUI();
                        if (result && result.resultCode == "0") {
                            fish.success("禁用成功！");
                            that.reloadProjects();
                        } else {
                            fish.error(result.resultMsg);
                        }
                    });
                });
            },
            //项目发布
            publicProject : function(){
                var that = this;
                var params = {};
                var selectedProject = that.$("#projectList").grid("getSelection");
                params.mgrId = selectedProject.mgrId;
                params.projectName = selectedProject.projectName;
                params.clusterId = selectedProject.clusterId;
                params.paymentType = selectedProject.paymentType;

                if(selectedProject.statusCdName == "待审批"){
                    fish.info('请提交审批通过后再发布');
                    return;
                }else if(selectedProject.statusCdName == "审批中"){
                    fish.info('正在审批，请等待审批以后再发布');
                    return;
                }else if(selectedProject.statusCdName == "禁用" || selectedProject.statusCd == "00X"){
                    fish.info('项目已经禁用无法发布');
                    //return;
                }else if(selectedProject.statusCdName == "审批不通过"){
                    fish.info("该项目审批不通过，请修改以后重新提交审核");
                    return;
                }
                fish.popupView({
                    url: projectEditConfirm,
                    height: 300,
                    width: "60%",
                    close:function(type){
                        if(type =='save'){
                            projectAction.updateProject(params, function (result) {
                                $.unblockUI();
                                if (result && result.resultCode == "0") {
                                    //fish.success("发布成功！");
                                    that.reloadProjects();
                                } else {
                                    fish.error(result.resultMsg);
                                }
                            });
                        }
                        that.reloadProjects();
                    },
                    callback:function(){
                    }
                }).then(function(view){
                    view.setProjectName(params);
                    //view.setParentInput(that);
                });
                params.statusCd = "已发布";
                params.project = selectedProject;

            },
            //进入工作区
            enterWorkSpace : function(){
                var that = this;
                that.is_Click.push(1);
                var selrow = that.$("#projectList").grid("getSelection");
                var param = {};
                console.log(selrow);
                param.mgrId = selrow.mgrId;
                param.projectName = selrow.projectName;
                portal.appGlobal.set('projectId',selrow.mgrId);
                portal.appGlobal.set('projectName',selrow.projectName);
                param.backUrl = "datadevweb/project/views/projectListView";
                that.requireView({
                    url: "datadevweb/project/views/ProjectMainView",
                    viewOption:param
                });
                that.undelegateEvents();//移除当前view的所有DOM监听事件
            },
            //项目提交审核
            authProject : function(){
                var that = this;
                that.is_Click.push(1);
                var selrow = that.$("#projectList").grid("getSelection");
                var param = {};
                var params = {};
                param.mgrId = selrow.mgrId;
                param.reqStaff = window.LoginInfo.userName;
                //alert(window.LoginInfo.userName);
                //console.log("+++++++++++++"+window.LoginInfo.userName);
                param.version = selrow.version;
                param.projectName = selrow.projectName;
                //alert(param.projectName);
                var date = new Date();
                param.reqTime = date;
                // alert(param.reqTime);
                if(selrow.statusCd == "已发布"){
                    fish.info("该项目已经发布，无需提交审核");
                    return;
                }else if(selrow.statusCd == '审批中'){
                    fish.info('该项目正在审核中，无需提交审核');
                    return;
                }else if(selrow.statusCd == '禁用'){
                    fish.info('该项目已经被禁用，无法提交审核');
                    return;
                }else if(selrow.statusCd == '审批不通过'){
                    fish.info('审批不通过，请修改以后再提交');
                    return;
                }else if(selrow.statusCd == '审批通过'){
                    fish.info('该项目已经通过审核');
                    return;
                }
                //params.statusCd = "审批中";
                params.mgrId = selrow.mgrId;
                // fish.success("提交成功！");
                that.requireView({
                    url: "datadevweb/versionManagement/views/projectAuthView",
                    viewOption:param
                    //Promise:params
                });
                that.reloadProjects();
            },
            //项目布署
            deployProject : function(){
                var that = this;
                that.is_Click.push(1);
                var selrow = that.$("#projectList").grid("getSelection");
                var param = {};
                //param.type="add";
                param.mgrId = selrow.mgrId;
                param.statusCd = selrow.statusCd;
                param.projectName = selrow.projectName;
                // param.backUrl = "datadevweb/project/views/projectListView";
                //
                // that.requireView({
                //     url: "datadevweb/project/views/projectDeployListView",
                //     viewOption:{
                //         mgrId:param.mgrId,
                //         projectName:param.projectName,
                //         backUrl:param.backUrl
                //     }
                // });
                // that.undelegateEvents();//移除当前view的所有DOM监听事件


                param.backUrl = "datadevweb/project/views/projectListView";

                that.requireView({
                    url: "datadevweb/projectDeploy/views/proReleaseView",
                    viewOption:{
                        mgrId:param.mgrId,
                        projectName:param.projectName,
                        backUrl:param.backUrl
                    }
                });
                that.undelegateEvents();//移除当前view的所有DOM监听事件

            },
            //  格式化日期
            getNowFormatDate:function() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours() + seperator2 + date.getMinutes()
                    + seperator2 + date.getSeconds();
                return currentdate;
            },
        });
        return UserManageView;
    });