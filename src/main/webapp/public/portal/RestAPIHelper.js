define(['i18n!language/public/public', 'language/public/resultMsgTool'],function(pub,resultMsgTool) {

    var callService = function (type, url, data, success, webroot){

        if(url.indexOf('manager:')>-1){
            url = url.replace("manager:",window.portal.servModel.MANAGER);
        }else if(url.indexOf('metadata:')>-1){
            url = url.replace("metadata:",window.portal.servModel.METADATA);
        }else if(url.indexOf('qlweb:')>-1){
            url = url.replace("qlweb:",window.portal.servModel.QLWEB);
        }else if(url.indexOf('ql:')>-1){
            url = url.replace("ql:",window.portal.servModel.QL);
        }
        var option = {};
        if(fish.isObject(url)){//处理第一个参数是option的场景
            option = url;
            url = option.url;
            data = option.data;
            success = option.success;
            webroot = option.webroot;
        } else {
            if(fish.isFunction(data)){//第一个参数是url,第二个参数是回调函数,没有参数
                webroot = success;
                success = data;
                data = null;
            }
        }

        var url = (webroot ? webroot:"") + (fish.restPrefix ? fish.restPrefix + "/" :"") + url ;

        if(data){
            if(type !== "GET"){
                if(fish.isEmpty(data) ) {
                    if(fish.isArray(data)){
                        data = "[]";
                    } else {
                        data = "{}";
                    }
                } else {
                    data = JSON.stringify(data);
                }
            }
        } else {
            data = null;
        }
        var ajaxOption = {
            type : type,
            url : url,
            data: data,
            success : function(re){
                var resultCode = re.resultCode;
                var resultMsg = re.resultMsg;
                var re2 ={};
                if(resultCode ==-1 && resultMsg=="$loginerr"){
                    re2.resultCode=resultCode;
                    re2.resultMsg=resultMsgTool.toInternational(resultMsg,pub);
                }else{
                    var re2 = re;
                }
                success && success(re2);
            },
            showError :false,
            error : function(xhr, status, error) {
                if (xhr.responseText) {
                    var errorObj = JSON.parse(xhr.responseText);
                    if(errorObj.type==0){ //业务异常
                        fish.warn(errorObj.code + " : " + errorObj.message);
                    }else if(errorObj.status=="404"){
                        $.unblockUI();
                        fish.error(pub.requesterr +errorObj.path);
                    }
                    else { //系统异常

                        if (errorObj.code == "S-SYS-00027") { //Session过期
                            $.unblockUI();
                            fish.info(pub.loginerr);
                            if (portal.appGlobal.get("currentStatus") != "sessionTimeOut") {
                                portal.appGlobal.set("currentStatus", "sessionTimeOut");
                            }

                        } else {
                            $.unblockUI();
                            fish.error(errorObj.message);
                        }
                    }
                } else { // 请求异常
                    console.error(xhr.responseText);
                    fish.error({
                        title: 'Ajax ' + status,
                        message: url + ' ' + error
                    });
                }
            },
            //#72 先暂停跨域请求，IE8，IE9有问题
            crossDomain : true,
            xhrFields : {
                withCredentials : true
            },
            cache : false
        }
        $.extend(true,ajaxOption,fish.omit(option, 'url', 'data'));

        if(type !== "GET") {
            ajaxOption.contentType  = 'application/json';
            ajaxOption.processData = false;
        }


        return fish.ajax(ajaxOption);
    };

    //同步型方法
    callServiceSync = function (type, url, data, success, webroot){

        if(url.startsWith('manager:')){
            url = url.replace("manager:",window.portal.servModel.MANAGER);
        }else if(url.startsWith('metadata:')){
            url = url.replace("manager:",window.portal.servModel.METADATA);
        }
        var option = {};
        if(fish.isObject(url)){//处理第一个参数是option的场景
            option = url;
            url = option.url;
            data = option.data;
            success = option.success;
            webroot = option.webroot;
        } else {
            if(fish.isFunction(data)){//第一个参数是url,第二个参数是回调函数,没有参数
                webroot = success;
                success = data;
                data = null;
            }
        }

        var url = (webroot ? webroot:"") + (fish.restPrefix ? fish.restPrefix + "/" :"") + url ;

        if(data){
            if(type !== "GET"){
                if(fish.isEmpty(data) ) {
                    if(fish.isArray(data)){
                        data = "[]";
                    } else {
                        data = "{}";
                    }
                } else {
                    data = JSON.stringify(data);
                }
            }
        } else {
            data = null;
        }

        var ajaxOption = {
            type : type,
            url : url,
            data: data,
            async: false,//这个是同步方法
            success : function(re){
                success && success(re);
            },
            showError :false,
            error : function(xhr, status, error) {
                if (xhr.responseText) {
                    var errorObj = JSON.parse(xhr.responseText);
                    if(errorObj.type==0){ //业务异常
                        fish.warn(errorObj.code + " : " + errorObj.message);
                    } else { //系统异常
                        if (errorObj.code == "S-SYS-00027") { //Session过期
                            $.unblockUI();
                            fish.info(pub.loginerr);
                            if (portal.appGlobal.get("currentStatus") != "sessionTimeOut") {
                                portal.appGlobal.set("currentStatus", "sessionTimeOut");
                            }

                        } else {
                            fish.error(errorObj.message);
                        }
                    }
                } else { // 请求异常
                    console.error(xhr.responseText);
                    fish.error({
                        title: 'Ajax ' + status,
                        message: url + ' ' + error
                    });
                }
            },
            //#72 先暂停跨域请求，IE8，IE9有问题
            crossDomain : true,
            xhrFields : {
                withCredentials : true
            },
            cache : false
        }
        $.extend(true,ajaxOption,fish.omit(option, 'url', 'data'));

        if(type !== "GET") {
            ajaxOption.contentType  = 'application/json';
            ajaxOption.processData = false;
        }


        return fish.ajax(ajaxOption);
    };

    /**
     * GET /collection：返回资源对象的列表（数组）
     * GET /collection/{id}：返回单个资源对象
     * POST /collection：返回新生成的资源对象
     * PUT /collection： 修改完整的资源对象
     * PATCH /collection/{id}：修改资源对象的部分属性
     * DELETE /collection/{id}：删除资源对象
     **/


    fish.get = function(url, data, success, webroot) {
        return callService("GET",url, data, success, webroot);
    };

    fish.post = function(url, data, success, webroot) {
        //console.trace()
        return callService("POST",url, data, success, webroot);
    };

    fish.postSync = function(url, data, success, webroot) {
        return callServiceSync("POST",url, data, success, webroot);
    };

    fish.put = function(url, data, success, webroot) {
        return callService("PUT",url, data, success, webroot);
    };

    fish.patch = function(url, data, success, webroot) {
        return callService("PATCH",url, data, success, webroot);
    };

    fish.remove = function(url, data, success, webroot) {
        return callService("DELETE",url, data, success, webroot);
    };




});
