/**
 * 项目Index页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/Login.html',
        '../actions/loginAction',
        '../../register/views/registerView',
        '../style/login.css'
    ],
    function (tem, LoginAction, registerView) {
        var LoginView = fish.View.extend({
            el:false,
            template:tem,
            events:{
                'click .loginBtn':'login',
                'click .registerBtn':'register',
                'click .findPasswordBtn':'findPassword'
            },
            initialize: function () {
            },
            // 登录
            login : function () {
                var that = this;
                var params = that.$('#loginForm').form();

                $.blockUI({
                    message: "登录中"
                });
                if (params.userAccount != undefined && params.userPassword != undefined){
                    LoginAction.login(params, function (result) {
                        $.unblockUI();
                        if (result && result.resultCode == 1){
                            window.localStorage.setItem("User",result.resultObject.User);
                            // param.backUrl = "components/res/views/resManageView";
                            that.requireView({
                                url: "components/res/views/resManageView",
                                viewOption:{
                                    // backUrl:param.backUrl
                                }
                            });
                            that.undelegateEvents();//移除当前view的所有DOM监听事件
                        }else fish.error("账号或密码错误！");
                    })
                }else fish.info("请检查输入！");
            },
            // 前往注册页面
            register : function () {
                var that = this;
                var param = {};
                param.backUrl = "components/system/login/views/loginView";
                that.requireView({
                    url: registerView,
                    viewOption:{
                        backUrl:param.backUrl
                    }
                });
                that.undelegateEvents();//移除当前view的所有DOM监听事件
            },
            // 找回密码
            findPassword : function () {
                
            }
        });
        return LoginView;
    });