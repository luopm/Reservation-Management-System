define(function () {
       return {
           // 登陆
           login: function (params, success) {
               var result = fish.ajax({type:"POST",url:'SystemController/Login',data:params,success:success});
               return result;
           },
           // 登出
           logout: function(params, success) {
               var result = fish.ajax({type:"POST",url:'SystemController/getLogout',data:params,success:success});
               return result;
           }
       }
});