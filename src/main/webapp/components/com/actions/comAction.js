define(function () {
       return {
           // 获取企业列表
           getComList : function (params, success) {
               var result = fish.ajax({type:"POST",contentType:"application/json",url:'ComController/getComList',data:params,success:success});
               return result;
           },
           // 更新
           updateCom : function(params, success){
               var result = fish.ajax({type:"POST",url:'ComController/updateCom',data:params,success:success});
               return result;
           },
           // 获取企业信息
           getComInfo : function (params, success) {
               var result = fish.ajax({type:"POST",url:'ComController/getComInfo',data:params,success:success});
               return result;
           },
           // 新增企业信息
           addCom : function (params, success) {
               var result = fish.ajax({type:"POST",url:'ComController/addCom',data:params,success:success});
               return result;
           }
       }
});