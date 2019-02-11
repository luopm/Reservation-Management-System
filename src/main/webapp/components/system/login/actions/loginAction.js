define(function () {
       var LoginAction = {
           // 登陆
           login: function (params, success) {
               var result = fish.post('SystemController/Login', params, success);
               return result;
           },

           // 登出
           logout: function(params, success) {
               var result = fish.post('LoginController/getLogout', params, success);
               return result;
           }

       };
       return LoginAction;
    }
)