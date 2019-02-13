define(function () {
        return {
            // 获取申购信息
            getPurchaseInfo: function(params, success) {
                var result = fish.ajax({type:"POST",url:'PurchaseController/getInfo',data:params,success:success});
                return result;
            },
            // 申购
            purchase: function(params, success) {
                var result = fish.ajax({type:"POST",url:'PurchaseController/add',data:params,success:success});
                return result;
            },
            // 取消申购
            cancelPurchase: function(params, success) {
                var result = fish.ajax({type:"POST",url:'PurchaseController/update',data:params,success:success});
                return result;
            },
            // 申购列表
            getPurchaseList: function(params, success) {
                var result = fish.ajax({type:"POST",url:'PurchaseController/getList',data:params,success:success});
                return result;
            }
        }
});