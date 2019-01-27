define(function () {
       var UserAction = {

           // 获取用户列表
           getUserList : function (params, success) {
               var result = fish.post('LoginController/getUserList', params, success);
               return result;
           },
           // 生效/禁用
           ableUser : function(params, success){
               var result = fish.post('LoginController/ableUser', params, success);
               return result;
           },
           // 重置密码
           resetPassword : function(params, success){
               var result = fish.post('LoginController/resetPassword', params, success);
               return result;
           },
           // 审核通过/未通过
           check : function(params, success){
               var result = fish.post('LoginController/check', params, success);
               return result;
           },
           // 授权管理
           resManage : function(params, success){
               var result = fish.post('LoginController/resManage', params, success);
               return result;
           },
           // 获取用户信息
           getUserInfo : function (params, success) {
               var result = fish.post('LoginController/getUserInfo', params, success);
               return result;
           }
       };
       return UserAction;
    }
)