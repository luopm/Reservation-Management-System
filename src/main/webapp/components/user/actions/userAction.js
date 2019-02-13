define(function () {
       return {
           // 获取用户列表
           getUserList : function (params, success) {
               var result = fish.ajax({type:"POST",url:'UserController/getUserList',data:params,success:success});
               return result;
           },
           // 生效/禁用
           ableUser : function(params, success){
               var result = fish.ajax({type:"POST",url:'UserController/ableUser',data:params,success:success});
               return result;
           },
           // 重置密码
           resetPassword : function(params, success){
               var result = fish.ajax({type:"POST",url:'UserController/resetPassword',data:params,success:success});
               return result;
           },
           // 审核通过/未通过
           check : function(params, success){
               var result = fish.ajax({type:"POST",url:'UserController/check',data:params,success:success});
               return result;
           },
           // 授权管理
           resManage : function(params, success){
               var result = fish.ajax({type:"POST",url:'UserController/resManage',data:params,success:success});
               return result;
           },
           // 获取用户信息
           getUserInfo : function (params, success) {
               var result = fish.ajax({type:"POST",url:'UserController/getUserInfo',data:params,success:success});
               return result;
           }
       }
});