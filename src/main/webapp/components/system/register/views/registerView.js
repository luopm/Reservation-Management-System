/**
 * 项目Index页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/register.html',
        '../actions/registerAction',
        '../../login/views/loginView'
    ],
    function (tem, RegisterAction, loginView) {
        var registerView = fish.View.extend({
            el:false,
            template:tem,
            events:{
                'click #loginBtn':'login',
                'click #registerBtn':'register'
            },
            initialize: function () {
            },
            // 返回登录页面
            login : function () {
                var that = this;
                // that.parentView.requireView({
                that.parentView.requireView({
                    selector:"#content",
                    url: "components/system/login/views/loginView",
                    // url:that.options.backUrl
                });
                // that.undelegateEvents();//移除当前view的所有DOM监听事件
            },
            // 注册
            register : function () {
                var that = this;
                var params = that.$('#registerForm').form().form("value");
                if (params.userAccount != undefined && params.userPassword != undefined){
                    params.userType = -1; //默认用户类型：普通用户
                    params.userDisable = -1; //默认用户状态：未审核
                    $.blockUI({
                        message: "注册中"
                    });
                    // fish.post('System/Register', params,
                    RegisterAction.register(params, function (result) {
                        $.unblockUI();
                        if (result && result.resultCode == 1){
                            window.sessionStorage.setItem("User",result.resultObject.userAccount);
                            window.sessionStorage.setItem("Name",result.resultObject.userName);
                            window.sessionStorage.setItem("Able",result.resultObject.userState);
                            // param.backUrl = "components/res/views/resManageView";
                            that.parentView.requireView({
                                selector:"#content",
                                url: "components/system/nav/views/homeView",
                                viewOption:{
                                    // backUrl:param.backUrl
                                }
                            });
                            // that.undelegateEvents();//移除当前view的所有DOM监听事件
                        }else fish.error("注册失败！");
                    })
                }else fish.info("请检查输入！");
            },

        });
        return registerView;
    });