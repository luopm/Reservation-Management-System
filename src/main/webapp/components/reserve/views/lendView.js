/**
 * 转借页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/reserve.html',
        '../actions/reserveAction',
        '../../register/views/registerView'
    ],
    function (tem, LoginAction, registerView) {
        var LendView = fish.View.extend({
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
                fish.info("登录成功");

                // $.blockUI({
                //     message: "登录中"
                // });
                // if (params.userAccount != undefined && params.userPassword != undefined){
                //     LoginAction.login(params, function (result) {
                //         $.unblockUI();
                //         if (result){
                //             if (result.resultCode == 0){
                //
                //             }
                //         }
                //     })
                // }
            },
            // 前往注册页面
            register : function () {
                var that = this;
                var param = {};
                param.backUrl = "components/login/views/loginView";
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
        return LendView;
    });