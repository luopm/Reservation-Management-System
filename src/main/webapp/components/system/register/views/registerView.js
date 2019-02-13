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
                that.requireView({
                    url: "components/system/login/views/loginView",
                    // url:that.options.backUrl
                });
                that.undelegateEvents();//移除当前view的所有DOM监听事件
            },
            // 注册
            register : function () {
                var that = this;
                var registerForm = that.$('#registerForm').form();
                var params = registerForm.form("value");
                if (params.userAccount != undefined && params.userPassword != undefined){
                    $.blockUI({
                        message: "注册中"
                    });
                    // fish.post('System/Register', params,
                    RegisterAction.register(params, function (result) {
                        $.unblockUI();
                        if (result && result.resultCode == 1){
                            window.localStorage.setItem("User",result.resultObject.userName);
                            // param.backUrl = "components/res/views/resManageView";
                            that.requireView({
                                url: "components/res/views/resManageView",
                                viewOption:{
                                    // backUrl:param.backUrl
                                }
                            });
                            that.undelegateEvents();//移除当前view的所有DOM监听事件
                        }else fish.error("注册失败！");
                    })
                }else fish.info("请检查输入！");
            },

        });
        return registerView;
    });