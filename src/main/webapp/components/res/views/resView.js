/**
 * 物品详情页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/res.html',
        '../actions/resAction'
    ],
    function (tem, resAction) {
        var ResView = fish.View.extend({
            el:false,
            template:tem,
            events:{
                'click #saveProject':'saveProject'
            },
            initialize: function () {
                var that = this;
            },
            afterRender : function () {
                var that = this;

                that.$("#resEnabledate").datetimepicker({
                    buttonIcon: ''
                });
                that.$("#resClass").combobox({
                    placeholder: 'Select res class',
                    dataTextField: 'name',
                    dataValueField: 'value',
                    dataSource: [
                        {name: '可外借', value: 1},
                        {name: '不外借', value: 2}
                    ],
                    template: '<li><a href="#">test</a></li>'
                });
                that.$("#resType").combobox({
                    placeholder: 'Select res type',
                    dataTextField: 'name',
                    dataValueField: 'value',
                    dataSource: [
                        {name: '企业级', value: 1},
                        {name: '分公司级', value: 2},
                        {name: '部门级', value: 3}
                    ]
                });
                // 修改、显示物品信息时引用此页面
                if (that.options.resCode){
                    that.getResInfo({resCode : that.options.resCode});
                }
            },
            // 获取物品信息
            getResInfo : function (param) {
                var that = this;
                resAction.getResInfo(param, function (result) {
                    if (result && result.resultCode == 1) {
                        that.$('#resFormInfo').form().form("value",result.resultObject);
                    }
                })

            },
            // 添加物品
            saveProject : function () {
                var that = this;
                if (!that.options.userAccount){
                    var param = that.$('#resFormInfo').form().form("value");
                    param.resEnabledate = new Date(param.resEnabledate);
                    param.resState = 3;//1在库/2借出/3待审核/4禁用/5报废；
                    $.blockUI({message:"请稍后"});
                    resAction.addRes(param, function (result) {
                        $.unblockUI();
                        if (result && result.resultCode == 1){
                            fish.success("添加物品成功");
                            that.popup.close();
                        }else{
                            fish.error(result.resultMsg);
                        }
                    })
                }
            }
        });
        return ResView;
    });