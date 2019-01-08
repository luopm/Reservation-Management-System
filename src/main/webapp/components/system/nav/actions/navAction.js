define(function () {
       var LoginAction = {
           // 获取目录信息
           getNavInfo: function(params, success) {
               var result = fish.post('LoginController/getLoginInfo', params, success);
               return result;
           }
       };
       return LoginAction;
    }
)