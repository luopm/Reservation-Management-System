/**
 * Created by yexihui on 17/8/15.
 */
var path_prefix = getWebPath();//'/DataMarket/';
var js_path_prefix =  getWebPath();//'/DataMarket/';

//document.write("<script src=\"public/v20/ui/js/common.js\"></script>");


function getWebPath() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 2);
    return (prePath + postPath);
}

function fixWidth(percent)
{
    return document.body.clientWidth * percent * 0.01; //这里你可以自己做调整
}


/**
 * 表单格式化JSON对象
 * @returns {{}}
 */
$.fn.serializeJsonObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


function ajaxRemotecall(urlParam,paramObject,successHandler){
    if(urlParam.startsWith('manager:')){
        urlParam = urlParam.replace("manager:",window.portal.servModel.MANAGER);
    }else if(urlParam.startsWith('metadata:')){
        urlParam = urlParam.replace("manager:",window.portal.servModel.METADATA);
    }
    var finalUrl = path_prefix+urlParam
    fish.ajax({
        url:finalUrl,
        method:'POST',//可以是POST或者GET，与jQuery原生的封装一致
        contentType: "application/json",
        data: JSON.stringify(paramObject),
        showMask:false,  //是否自动显式全局遮罩
        showError:false, //在出现异常时自动显示异常信息，后台需要返回的数据格式：{code:'ERROR-1001',message:'登录失败'}
        timeout:30000,   //超过3秒显式全局遮罩，此参数在showMask为true时才有效
        beforeSend:function(){
        },
        compelete:function(response,status){//注意这里回调函数的参数
        },
        success: function(result,status,response) {//注意这里回调函数的参数
            successHandler(result);
        },
        //【注意】如果你在这里配置了自己的error处理函数，fish.ajax就不会自动帮你显示异常信息了！
        error:function(XHR,status,error){//注意这里回调函数的参数
            console.log(XHR)
            alert("后台服务出错");
        }
    });
}





