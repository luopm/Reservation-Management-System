/**
 * 用户详情页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/user.html',
        '../actions/userAction'
    ],
    function (tem, UserAction) {
        var UserView = fish.View.extend({
            el:false,
            template:tem,
            events:{
                // 'click #saveUser':'saveUser',
                // 'click #closeUser':'register',
            },
            initialize: function () {
                var that = this;
                // 修改、显示信息时引用此页面
                if (that.options.userAccount){
                    that.getUserInfo(that.options.userAccount);
                }
            },
            getUserInfo : function (param) {
                var that = this;
                UserAction.getUserInfo(param, function (result) {
                    if (result && result.resultCode == 0) {
                        that.$('#userFormInfo').form(result.resultObject)
                    }
                })
                
            }
        });
        return UserView;
    });