/**
 * 企业详情页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/com.html',
        '../actions/comAction'
    ],
    function (tem, ComAction) {
        var ComView = fish.View.extend({
            el:false,
            template:tem,
            events:{
                'click #saveCom':'saveCom'
                // 'click #closeUser':'register',
            },
            initialize: function () {
                var that = this;

            },
            afterRender : function () {
                var that = this;
                that.$("#comCreateddate").datetimepicker({
                    buttonIcon: ''
                });
                that.$("#comState").combobox({
                    placeholder: 'Select Com State',
                    dataTextField: 'name',
                    dataValueField: 'value',
                    size: "m",
                    dataSource: [
                        {name: '正常', value: 1},
                        {name: '待审核', value: 2},
                        {name: '禁用', value: 3},
                        {name: '注销', value: 4},
                        {name: '审核不通过', value: 5}
                    ]
                });
                that.$("#comType").combobox({
                    placeholder: 'Select Com Type',
                    dataTextField: 'name',
                    dataValueField: 'value',
                    dataSource: [
                        {name: '企业', value: 1},
                        {name: '分公司', value: 2},
                        {name: '部门', value: 3},
                        {name: '其他', value: 4}
                    ]
                });
                // 修改、显示信息时引用此页面
                if (that.options.comCode){
                    that.getComInfo({comCode:that.options.comCode});
                }
            },
            getComInfo : function (param) {
                var that = this;
                ComAction.getComInfo(param, function (result) {
                    if (result && result.resultCode == 1) {
                        that.$('#comFormInfo').form().form('value',result.resultObject)
                    }
                })
                
            },
            saveCom : function () {
                var that = this;
                var param = that.$('#comFormInfo').form().form("value");
                param.comState = 2;
                param.comCreateddate = new Date();
                if (param.comCode != null && param.comName != null && param.comTel != null &&
                    param.comEmail != null && param.comState != null && param.comType != null) {
                    $.blockUI({message:"请稍后"});
                    ComAction.addCom(param, function (result) {
                        $.unblockUI();
                        if (result && result.resultCode == 1){
                            fish.success("新增组织成功");
                            that.popup.close();
                        }else{
                            fish.error(result.resultMsg);
                        }
                    })
                }
            }
        });
        return ComView;
    });