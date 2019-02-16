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

                that.$("#resEnableDate").datetimepicker({
                    buttonIcon: ''
                });
                that.$("#resTypecode").combobox({
                    placeholder: 'Select res type',
                    dataTextField: 'name',
                    dataValueField: 'value',
                    dataSource: [
                        {name: '可外借', value: 1},
                        {name: '不外借', value: 0}
                    ],
                    template: '<li><a href="#">test</a></li>'
                });

                // that.$("#resCustodian").combobox({
                //     placeholder: 'Select res type',
                //     dataTextField: 'name',
                //     dataValueField: 'value',
                //     dataSource: [
                //         {name: '可外借', value: 1},
                //         {name: '不外借', value: 0}
                //     ],
                //     template: '<li><a href="#">test</a></li>'
                // });

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
                    param.resEnableDate = new Date(param.resEnableDate);
                    param.resState = "待确认";//添加物品默认待确认；在库、借出、报废；
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