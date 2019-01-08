define(function () {
       var RegisterAction = {
           // 注册
           register: function (params, success) {
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },

           // 登出
           logout: function(params, success) {
               var result = fish.post('LoginController/getLogout', params, success);
               return result;
           },

           // // 获取登录信息
           // getLoginInfo: function(params, success) {
           //     var result = fish.post('LoginController/getLoginInfo', params, success);
           //     return result;
           // }
       };
       return RegisterAction;
    }
)