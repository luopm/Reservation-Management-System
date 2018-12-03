define(function() {
	function getWebRootPath() {
		var webroot = document.location.href;
		webroot = webroot.substring(webroot.indexOf('//') + 2, webroot.length);
		webroot = webroot.substring(webroot.indexOf('/') + 1, webroot.length);
		webroot = webroot.substring(0, webroot.indexOf('/'));
        if(webroot.indexOf("?")!=-1) webroot="";
		var rootpath = webroot.length<=0 ? "" :  "/" + webroot;
		return rootpath;
	};
	var AppGlobal = fish.Model.extend({
		defaults: {
			currentStatus: "", //当前的状态（login表示登录状态，running表示已经登录并且session没有过期，sessionTimeOut表示session过期，beenKickedFromLogin表示从登录状态踢出）
			postId:"",//当前岗位ID
            language: "en", //默认是英语
			charset: "UTF-8", //默认编码
			webroot: getWebRootPath(), //第一次请求main.html会根据浏览器计算,后面则通过服务返回值注入进来
			version: "V1.0", //默认的版本信息,
			userId: null,//当前用户
            province:""
		},

        initialize: function () {
            var self = this;
          /*  if (this.get("province")=="" ) {
                fish.get("portal/DataDictController/getDataDictByCode?groupCode=AppGlobal&paramCode=province", function (data) {
                    if (data && data.paramValue) {
                        self.set("province", data.paramValue);
                    }
                });
            }*/
        }
	});
	return new AppGlobal(); //单例
});