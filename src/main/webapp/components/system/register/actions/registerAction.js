define(function () {
    return {
        // 注册
        register: function (params, success) {
            var result = fish.ajax({type:"POST",url:'SystemController/Register',data:params,success:success});
            // var result = fish.post('System/Register', params, success);
            return result;
        }
    }
});