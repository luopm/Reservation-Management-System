! function(){
	"use strict";

	/**
	 * fish.grid控件扩展
	 */
	$.widget('ui.grid',$.ui.grid,{
		/**
		 * 覆盖原始的加载数据方法，让datatype由实际传入数据的瞬间决定
		 * 如果传参时数据是数组，则认为是local，如果不是数组，则认为是json
		 */
		reloadData: function(newData) {
            if (newData) {
                var dtype = $.isArray(newData)?"local":"json";
                $(this.element).grid("setGridParam", {
                    "datatype": dtype
                });
            }
            this._super(newData);
        },
        _create : function () {
		    var ts = this;
            //修改grid模板
            $.jgrid.tpl = `<div class="ui-jqgrid" id="{{id}}">
             <div class="ui-jqgrid-view" id="gview_{{id}}">
             {{#if showTitlebar}}
             <div class="ui-jqgrid-titlebar clearfix">
             {{#if caption}}
             <span class="ui-jqgrid-title">{{caption}}</span>
             {{/if}}
             {{#if hidegrid}}
             <a role="link" class="ui-jqgrid-titlebar-close HeaderButton">
             <span class="glyphicon glyphicon-triangle-top"></span>
             </a>
             {{/if}}
             {{#if searchbar}}
             <div class="input-group search-group{{#if caption}} pull-right{{/if}}"></div>
             {{/if}}
             </div>
             {{/if}}
             {{#if topbar}}
             <div class="ui-userdata ui-userdata-t" id="t_{{id}}"></div>
             {{/if}}
             <div class="ui-jqgrid-hdiv" {{#if colHide}}style="display:none;"{{/if}}>
             <div class="ui-jqgrid-hbox">
             <table class="ui-jqgrid-htable" role="grid" aria-labelledby="{{id}}" cellspacing="0" cellpadding="0" border="0">
             <thead>
             <tr class="ui-jqgrid-labels" role="rowheader">
             {{#colModel}}
             <th id="{{../id}}_{{name}}" role="columnheader" class="ui-state-default ui-th-column" title="{{headertitle}}">
             {{#if resizable}}
             <span class="ui-jqgrid-resize">&nbsp;</span>
             {{/if}}
             <div id="jqgh_{{../id}}_{{name}}">
             {{#ifCond name '===' 'cb'}}
             <input role="checkbox" id="cb_{{../../id}}" class="cbox" type="checkbox">
             {{else}}{{label}}{{/ifCond}}
             {{#if sortable}}
             <span class="s-ico" style="display:none">
             <span sort="asc" class="ui-grid-ico-sort ui-icon-asc ui-state-disabled glyphicon glyphicon-triangle-top"></span>
             <span sort="desc" class="ui-grid-ico-sort ui-icon-desc ui-state-disabled glyphicon glyphicon-triangle-bottom"></span>
             </span>
             {{/if}}
             </div>
             </th>
             {{/colModel}}
             </tr>
             </thead>
             </table>
             </div>
             </div>
             <div class="ui-jqgrid-bdiv" style="height: {{height}}px;">
             <div>
             <div></div>
             <table id="btable_{{id}}" tabindex="0" cellspacing="0" cellpadding="0" border="0" role="grid" aria-multiselectable="{{multiselect}}" aria-labelledby="{{id}}" class="ui-jqgrid-btable">
             <tbody>
             <tr class="jqgfirstrow" role="row" style="height:auto">
             {{#colModel}}
             <td role="gridcell" style="height:0.01px;"></td>
             {{/colModel}}
             </tr>
             </tbody>
             </table>
             </div>
             </div>
             {{#if footerrow}}
             <div class="ui-jqgrid-sdiv">
             <div class="ui-jqgrid-hbox">
             <table role="grid" class="ui-jqgrid-ftable" cellspacing="0" cellpadding="0" border="0">
             <tbody>
             <tr role="row" class="footrow">
             </tr>
             </tbody>
             </table>
             </div>
             </div>
             {{/if}}
             {{#if bottombar}}
             <div class="ui-userdata ui-userdata-tb" id="tb_{{id}}"></div>
             {{/if}}
             </div>
             <div class="ui-jqgrid-resize-mark" id="rs_m{{id}}">&nbsp;</div>
             {{#if pagebar}}
             <div id="{{id}}_pager" class="ui-jqgrid-pager">
             <div id="{{id}}_pager_left" class="ui-pg-button col-md-6"></div>
             <div id="{{id}}_pager_right" class="ui-pg-control col-md-6"></div>
             </div>
             {{/if}}
             </div>`
             ;
            ts._super();
        },
        /**
         * 覆盖初始化方法，让grid支持url配置项
         */
        _init:function(){
        	var ts = this;

        	if (ts.options.url && typeof ts.options.url === "string"){
        		ts.options.datatype = "json";
        		if(!ts.options.param){
        			ts.options.param = {};//用于服务器请求的参数
        		}
        		//如果是字符串，则认为是新加入的AJAX调用
        		var str_arr = ts.options.url.split(".");
        		var classname = str_arr[0];
        		var method = str_arr[1];
        		ts.options.pageData = (function(){
        			return function(page, rowNum, sortname, sortorder){
        				var p_param = $.extend({},ts.options.param);

        				p_param.page = page;
                		p_param.rowNum = rowNum;
                		fish.callService(classname,method,p_param,function(reply){
    			        	if(reply){
    			        		ts.reloadData(reply);
    			        	}
                		});

                		return false;
        			};
        		})();
        	}

        	ts._super();

            //执行完原有初始化方法以后加载第一页
            if(ts.options.pageData){
            	$(this.element).grid("populatePage");
            }

        },
        //提供跳转到指定页面方法
        //type为local时可能会导致异常，待考
        toPage: function(page){
            $(this.element).grid("setGridParam", {
                "page": page
            });
            $(this.element).grid("populatePage");
        }
	});
}();