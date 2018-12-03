! function(){
    "use strict";

    /**
     * fish.grid控件扩展
     */
    $.widget('ui.grid',$.ui.grid,{

        /**
         * 覆盖初始化方法，让grid支持url配置项，如果是orgauth和portal的则使用扩展的表格分页方法
         */
        _init:function(){
            var ts = this;


            var origUrl = ts.options.url;
            var isReplaced = false;

            //组织机构和门户开头的替换为自己扩展的方法
            if(ts.options.url && typeof ts.options.url === "string"){
                if(ts.options.url.indexOf("orgauth/")!=-1 || ts.options.url.indexOf("portal/")!=-1){
                    ts.options.url = null;
                    ts.options.pageData = null;
                    ts.options.datatype = "local";
                    isReplaced = true;
                }
            }


            //调用父方法
            ts._super();


            if (isReplaced){
                ts.options.url = origUrl;//恢复原来的地址
                ts.options.datatype = "json";
                if(!ts.options.param){
                    ts.options.param = {};//用于服务器请求的参数
                }
                ts.options.jsonReader = {
                    root: "list",//数据源对应的key值
                    page: "pageNum",//当前页对应的key值
                    total: "pages",//总页数对应的key值,treeGrid场景中,子节点无法计算,total必须要自己传进来
                    records: "total",//总记录数的key值,正常数据传入了总记录数,total就不需要传了,会自动计算出来的
                    id: "id",//
                    userdata: "userdata"
                };
                ts.options.pageData = (function(){
                    return function(page, rowNum, sortname, sortorder,filterCol, filterVal){
                        var p_param = $.extend({},ts.options.param);
                        p_param.pageNum = page;
                        p_param.pageSize = rowNum;
                        p_param.sortName = sortname;
                        p_param.sortOrder = sortorder;
                        p_param.pageSize = rowNum;

                        //先设置为option中的两个属性
                        p_param.filterCol = ts.options.filterCol;
                        p_param.filterVal = ts.options.filterVal;

                        if(filterCol){
                            p_param.filterCol = filterCol;
                        }
                        if(filterVal){
                            p_param.filterVal = filterVal;
                        }

                        var url = ts.options.url;




                        fish.post(url, p_param, function(resp){
                            ts.reloadData(resp);
                        });


                        return false;
                    };
                })();
            }



            //执行完原有初始化方法以后加载第一页
            if(ts.options.pageData){
                $(this.element).grid("populatePage");
            }
        }
    });
}();