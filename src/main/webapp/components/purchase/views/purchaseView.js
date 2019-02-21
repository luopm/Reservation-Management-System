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
            },
            afterRender : function () {
                var that = this;
                if (that.options.user != undefined){ //新增采购:初始化用户和物品信息
                    that.$('#BuyFormInfo').form().form("value",that.options.user);
                }else if (that.options.buyCode != undefined) {//查看详情:加载采购信息
                    that.getPurchaseInfo(that.options.buyCode);
                }
            },
            // 获取申购信息
            getPurchaseInfo : function (buyCode) {
                var that = this;
                param = {buyCode : buyCode};
                purchaseAction.getPurchaseInfo(param, function (result) {
                    if (result && result.resultCode == 1) {
                        that.$('#BuyFormInfo').form().form('value', result.resultObject);
                    }
                })

            },
            // 保存申购
            savePurchase : function () {
                var that = this;
                var param = that.$('#BuyFormInfo').form().form("value");
                param.buyState = "待审核";
                param.buyApplydate = new Date();
                if (param.buyResname != null && param.buyResprice != null && param.buyResstandard != null &&
                    param.buyUseraccount != null && param.buyReason != null) {
                    $.blockUI({message:"请稍后"});
                    purchaseAction.purchase(param, function (result) {
                        $.unblockUI();
                        if (result && result.resultCode == 1){
                            fish.success("新增采购成功");
                            that.popup.close();
                        }else{
                            fish.error(result.resultMsg);
                        }
                    })
                }
            }
        });
        return PurchaseView;
    });