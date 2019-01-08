/**
 * 申购详情页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/purchase.html',
        '../actions/purchaseAction',
    ],
    function (tem, purchaseAction ) {
        var PurchaseView = fish.View.extend({
            el:false,
            template:tem,
            events:{
                'click #savePurchase':'savePurchase'
            },
            initialize: function () {
                var that = this;
                // 修改、显示申购信息时引用此页面
                if (that.options.userAccount){
                    that.getPurchaseInfo(that.options.userAccount);
                }
            },
            // 获取申购信息
            getPurchaseInfo : function (param) {
                var that = this;
                purchaseAction.getPurchaseInfo(param, function (result) {
                    if (result && result.resultCode == 0) {
                        that.$('#BuyFormInfo').form(result.resultObject)
                    }
                })

            },
            // 保存申购
            savePurchase : function () {
                var that = this;
                if (!that.options.userAccount){
                    var param = that.$('#BuyFormInfo').form();
                    $.blockUI({message:"请稍后"});
                    purchaseAction.purchase(param, function (result) {
                        $.unblockUI();
                        if (result && result.resultCode == 0){
                            fish.success("保存成功");
                        }else{
                            fish.error(result.resultMsg);
                        }
                    })
                }
            }
        });
        return PurchaseView;
    });