define(function () {
       return {
           // 获取所有物品列表
           getResList: function (params, success) {
               var result = fish.ajax({type:"POST",contentType:"application/json",url:'ResController/getResList',data:params,success:success});
               return result;
           },
           // 获取物品信息
           getResInfo: function (params, success) {
               var result = fish.ajax({type:"POST",url:'ResController/getResInfo',data:params,success:success});
               return result;
           },
           // 录入物品
           addRes: function (params, success) {
               var result = fish.ajax({type:"POST",url:'ResController/addRes',data:params,success:success});
               return result;
           },
           // 删除物品
           deleteRes: function (params, success) {
               var result = fish.ajax({type:"POST",url:'ResController/deleteRes',data:params,success:success});
               return result;
           },
           // 删除物品
           updateRes: function (params, success) {
               var result = fish.ajax({type:"POST",url:'ResController/updateRes',data:params,success:success});
               return result;
           }
       }
});