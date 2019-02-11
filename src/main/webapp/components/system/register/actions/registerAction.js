define(function () {
       var RegisterAction = {
           // 注册
           register: function (params, success) {
               var result = fish.post('SystemController/Register', params, success);
               return result;
           }
       };
       return RegisterAction;
    }
)