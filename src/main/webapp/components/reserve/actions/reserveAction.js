define(function () {
       var LoginAction = {

           // 获取预约历史列表
           getReserveList : function (params, success) {
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 归还物品
           returnRes : function (params, success) {
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 转借物品
           applyLend : function (params, success) {
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 预约借用物品
           reserve : function (params, success) {
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
       };
       return LoginAction;
    }
)