/**
 * 项目Index页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/Login.html',
        '../actions/loginAction',
        'css!../style/login.css'
    ],
    function (tem, LoginAction) {
        var LoginView = fish.View.extend({
            el:false,
            template:tem,
            events:{
                'click #loginBtn':'login',
                'click #registerBtn':'register',
                'click .findPasswordBtn':'findPassword'
            },
            initialize: function () {
            },
            // 登录
            login : function () {
                var that = this;
                var loginForm = that.$('#loginForm').form();
                var params = loginForm.form("value");
                if (params.userAccount != undefined && params.userPassword != undefined){
                    $.blockUI({
                        message: "登录中"
                    });
                    LoginAction.login(params, function (result) {
                        $.unblockUI();
                        if (result && result.resultCode == 1){
                            window.localStorage.setItem("User",result.resultObject.User);
                            // param.backUrl = "components/res/views/resManageView";
                            that.requireView({
                                // selector:"#content",
                                url: "components/system/nav/views/homeView",
                                // url:homeView,
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
                    //url: registerView,
                    url:"components/system/register/views/registerView",
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