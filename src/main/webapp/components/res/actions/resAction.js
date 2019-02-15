define(function () {
       return {
           // 获取所有物品列表
           getResList: function (params, success) {
               var result = fish.ajax({type:"POST",url:'ResController/getResList',data:params,success:success});
               return result;
           },
           // 可借用/禁用
           ableRes: function (params, success) {
               var result = fish.ajax({type:"POST",url:'ResController/ableRes',data:params,success:success});
               return result;
           },
           // 报废
           outOfUse: function (params, success) {
               var result = fish.ajax({type:"POST",url:'ResController/outOfUse',data:params,success:success});
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
           }
       }
});