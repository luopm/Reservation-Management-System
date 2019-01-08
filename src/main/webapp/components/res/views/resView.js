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
                // 修改、显示物品信息时引用此页面
                if (that.options.userAccount){
                    that.getResInfo(that.options.userAccount);
                }
            },
            // 获取物品信息
            getResInfo : function (param) {
                var that = this;
                resAction.getResInfo(param, function (result) {
                    if (result && result.resultCode == 0) {
                        that.$('#userFormInfo').form(result.resultObject)
                    }
                })

            },
            // 添加物品
            saveProject : function () {
                var that = this;
                if (!that.options.userAccount){
                    var param = that.$('#resFormInfo').form();
                    $.blockUI({message:"请稍后"});
                    resAction.addRes(param, function (result) {
                        $.unblockUI();
                        if (result && result.resultCode == 0){
                            fish.success("添加物品成功");
                        }else{
                            fish.error(result.resultMsg);
                        }
                    })
                }
            }
        });
        return ResView;
    });