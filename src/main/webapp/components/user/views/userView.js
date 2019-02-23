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

            },
            afterRender : function () {
                var that = this;
                // 修改、显示信息时引用此页面
                if (that.options.userAccount){
                    that.getUserInfo({userAccount:that.options.userAccount});
                }
                that.$("#userCreateddate").datetimepicker({
                    buttonIcon: ''
                });
                that.$("#userState").combobox({
                    placeholder: 'Select res class',
                    dataTextField: 'name',
                    dataValueField: 'value',
                    dataSource: [
                        {name: '正常', value: 1},
                        {name: '待审核', value: 2},
                        {name: '禁用', value: 3},
                        {name: '注销', value: 4},
                        {name: '审核不通过', value: 5}
                    ]
                });
                that.$("#userType").combobox({
                    placeholder: 'Select res class',
                    dataTextField: 'name',
                    dataValueField: 'value',
                    dataSource: [
                        {name: '企业用户', value: 1},
                        {name: '分公司用户', value: 2},
                        {name: '部门用户', value: 3},
                        {name: '普通用户', value: 4}
                    ]
                });
            },
            getUserInfo : function (param) {
                var that = this;
                UserAction.getUserInfo(param, function (result) {
                    if (result && result.resultCode == 1) {
                        that.$('#userFormInfo').form().form('value',result.resultObject)
                    }
                })
                
            }
        });
        return UserView;
    });