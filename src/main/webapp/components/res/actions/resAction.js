define(function () {
       var LoginAction = {
           // 获取所有物品列表
           getResList: function (params, success) {
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 可借用
           enableRes: function (params, success) {
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 禁用
           disableRes: function (params, success) {
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 报废
           outOfUse: function (params, success) {
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 获取物品信息
           getResInfo: function (params, success) {
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 获取可借用物品列表
           getResAbleList: function (params, success) {
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 录入物品
           addRes: function (params, success) {
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 删除物品
           deleteRes: function (params, success) {
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
       };
       return LoginAction;
    }
)