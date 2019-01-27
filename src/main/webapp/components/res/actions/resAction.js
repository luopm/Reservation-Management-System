define(function () {
       var LoginAction = {
           // 获取所有物品列表
           getResList: function (params, success) {
               var result = fish.post('LoginController/getResList', params, success);
               return result;
           },
           // 可借用/禁用
           ableRes: function (params, success) {
               var result = fish.post('LoginController/ableRes', params, success);
               return result;
           },
           // 报废
           outOfUse: function (params, success) {
               var result = fish.post('LoginController/outOfUse', params, success);
               return result;
           },
           // 获取物品信息
           getResInfo: function (params, success) {
               var result = fish.post('LoginController/getResInfo', params, success);
               return result;
           },
           // 获取可借用物品列表
           getResAbleList: function (params, success) {
               var result = fish.post('LoginController/getResAbleList', params, success);
               return result;
           },
           // 录入物品
           addRes: function (params, success) {
               var result = fish.post('LoginController/addRes', params, success);
               return result;
           },
           // 删除物品
           deleteRes: function (params, success) {
               var result = fish.post('LoginController/deleteRes', params, success);
               return result;
           },
       };
       return LoginAction;
    }
)