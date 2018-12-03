define([
    "public/portal/AppGlobal",
    "public/portal/CommonAction",
    "public/portal/Utils",
    "public/portal/RestAPIHelper",
    "public/portal/LoginInfo",
    "public/portal/ServModel",
    "system/actions/SysUtilAction"
], function ( appGlobal,CommonAction,utils, RestAPIHelper,LoginInfo,ServModel,SysUtilAction) {

    //将几个公共模块挂到fish对象上面
    var FishView = fish.View,
        PortalDef = function () {
            this.appGlobal = appGlobal;
            this.promise = {};
            this.servModel=ServModel;
        }


    window.portal = new PortalDef();
    window.portal.utils = utils;
    window.portal.servModel=ServModel;


    window.portal.localajax = false; //研发开关，如果为true,自己拼装json数据返回,方便前端研发调试不依赖服务，如果为false，去请求服务端数据


    $.extend(fish,CommonAction);

    fish.utils = utils;

    fish.SysUtilAction=SysUtilAction;

    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position){
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }

    function SubType(){
        var requireView=this.requireView;
        this.requireView=function () {
            requireView.call(this);
        }
    }


    var requireView = fish.View.prototype.requireView;

    /**
     * requireView 方式，需要支持命名空间
     * @param options
     */
    var overWriteRequire=function (options) {
        var pathName = document.location.pathname;
        var index = pathName.substr(1).indexOf("/");
        var result = pathName.substr(0,index+1);
        if ($.type(options) === 'string') {
            options = { url: options };
        }
        var url = options.url;
        if($.type(url) === 'string'){
            if(url.indexOf('manager:')>-1){
                url = url.replace("manager:",window.portal.servModel.MANAGER);
            }else if(url.indexOf('metadata:')>-1){
                url = url.replace("metadata:",window.portal.servModel.METADATA);
            }else if(url.indexOf('qlweb:')>-1){
                url = url.replace("qlweb:",window.portal.servModel.QLWEB);
            }else if(url.indexOf('ql:')>-1){
                url = url.replace("ql:",window.portal.servModel.QL);
            }
        }
        options.url = url;
        requireView.call(this,options);
    }
    fish.View.prototype.requireView=overWriteRequire;
    


    
});