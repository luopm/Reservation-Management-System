define(function () {
       var UserAction = {

           // 获取用户列表
           getUserList : function (params, success) {
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 生效
           enableUser : function(params, success){
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 禁用
           disableUser : function(params, success){
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 重置密码
           resetPassword : function(params, success){
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 审核通过
           checkOk : function(params, success){
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 审核未通过
           checkNotOk : function(params, success){
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 授权管理
           resManage : function(params, success){
               var result = fish.post('LoginController/getLogin', params, success);
               return result;
           },
           // 获取用户信息
           getUserInfo : function (params, success) {
               var result = fish.post('', params, success);
               return result;
           }
       };
       return UserAction;
    }
)