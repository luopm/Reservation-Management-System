define(function () {
        return {
            // 获取申购信息
            getPurchaseInfo: function(params, success) {
                var result = fish.ajax({type:"POST",url:'PurchaseController/getPurchase',data:params,success:success});
                return result;
            },
            // 申购
            purchase: function(params, success) {
                var result = fish.ajax({type:"POST",url:'PurchaseController/addPurchase',data:params,success:success});
                return result;
            },
            // 取消申购
            cancelPurchase: function(params, success) {
                var result = fish.ajax({type:"POST",url:'PurchaseController/updatePurchase',data:params,success:success});
                return result;
            },
            // 申购列表
            getPurchaseList: function(params, success) {
                var result = fish.ajax({type:"POST",url:'PurchaseController/getPurchaseList',data:params,success:success});
                return result;
            }
        }
});