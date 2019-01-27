define(function () {
        var LoginAction = {
            // 获取申购信息
            getPurchaseInfo: function(params, success) {
                var result = fish.post('PurchaseController/getInfo', params, success);
                return result;
            },
            // 申购
            purchase: function(params, success) {
                var result = fish.post('PurchaseController/add', params, success);
                return result;
            },
            // 取消申购
            cancelPurchase: function(params, success) {
                var result = fish.post('PurchaseController/update', params, success);
                return result;
            },
            // 申购列表
            getPurchaseList: function(params, success) {
                var result = fish.post('PurchaseController/getList', params, success);
                return result;
            }
        };
        return LoginAction;
    }
)