define(function () {
       return {
           // 获取预约历史列表
           getReserveList : function (params, success) {
               var result = fish.ajax({type:"POST",url:'ReserveController/getReserveList',data:params,success:success});
               return result;
           },
           // 归还物品
           returnRes : function (params, success) {
               var result = fish.ajax({type:"POST",url:'ReserveController/updateReserve',data:params,success:success});
               return result;
           },
           // 转借物品
           applyLend : function (params, success) {
               var result = fish.ajax({type:"POST",url:'ReserveController/updateReserve',data:params,success:success});
               return result;
           },
           // 预约借用物品
           reserve : function (params, success) {
               var result = fish.ajax({type:"POST",url:'ReserveController/addReserve',data:params,success:success});
               return result;
           },
           // 获取借用信息
           getReserve : function (params, success) {
               var result = fish.ajax({type:"POST",url:'ReserveController/getReserve',data:params,success:success});
               return result;
           }
       }
});