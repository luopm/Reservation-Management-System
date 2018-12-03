!function(){
	'use strict';
	
	var searchtemplate = '<div class="form-group col-md-12">\n\t\t\t<div class="input-group">\n\t\t\t\t<span class="input-group-addon">\n\t\t\t\t\t<i class="search-icon iconfont icon-search"></i>\n\t\t\t\t</span>\n\t\t\t\t<input type="text" class="form-control hyperselect-search" placeholder="搜索内容">\n\t\t\t</div>\n\t\t</div>';
	
	$.widget('ui.hypercombotree',$.ui.combotree,{
		options:{
			loadmode: 'all',//加载模式，all的话定位到指定节点会打开所有向上结构的节点，否则为仅父节点路径
			searchcheck: function(){return true;},//通过搜索框输入，是否触发查询的检测方法，searchcheck(val)，该方法返回true则表示可以进行查询
			search: $.noop,//通过搜索框输入，查询的检测方法，返回数组表示的键值对对象结果，多个则返回数组，数据格式需与tree的格式一致
		},
		_create:function(){
			//重载：添加搜索框
			this._super();
			this.comboTree.$content.prepend(searchtemplate);
		}
	});
}();