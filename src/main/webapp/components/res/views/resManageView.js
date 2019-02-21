/**
 * 物品管理页面- 管理员
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/resManage.html',
        '../actions/resAction',
        './resView'
    ],
    function (tem, resAction, resView) {
        var ResManageView = fish.View.extend({
            el:false,
            template:tem,
            events:{
                'click #resEnable':'enable',
                'click #resDisable':'disable',
                'click #OutOfUse':'OutOfUse',
                'click #addRes':'addRes',
                'click #deleteRes':'deleteRes',
            },
            initialize: function () {
                var that = this;
                that.searchRes();
            },
            afterRender: function () {
                var that = this;
                //注册页面事件
                that.initPageEvents();
            },
            //注册页面事件
            initPageEvents:function(parma){
                var that = this;
                //项目名称查询回车事件
                that.$("#keywordCode").keydown(function(event) {
                    if (event.keyCode == "13") {
                        that.searchRes();
                    }
                });
                that.$("#keywordState").keydown(function(event) {
                    if (event.keyCode == "13") {
                        that.searchRes();
                    }
                });
                that.$("#searchByState").click(function () {
                    that.searchRes();
                })
            },
            //查询用户
            searchRes:function(){
                var that = this;
                //that.$('#projectList').grid("destroy");
                that.initResListGrid(that.pageIndex,that.pageSize);
            },
            //重新加载当前页
            reloadRes:function () {
                var that = this;
                var pagination = $('#Res-pagination .active').attr("data-page");
                if (pagination == undefined ) pagination = 1;//当前无数据时即分页值为空时，为免查询报错，赋值为1
                that.initResListGrid(pagination,that.pageSize);
            },
            //初始化用户列表
            initResListGrid:function(pageNum,pageSize){
                var that = this;
                var params = {};
                params.pageIndex = pageNum;
                params.pageSize = pageSize;
                // var resData = [
                //     {resName:"car", resCode:10000, resStandard:"middle car", resPrice:"$10000", resLocation:"warehouse", resState:1},
                //     {resName:"car", resCode:10001, resStandard:"big car", resPrice:"$20000", resLocation:"warehouse", resState:1}
                // ];
                if(that.$("#keywordCode").val() !=''){
                    params.resCode = that.$("#keywordCode").val();
                }
                if(that.$("#keywordState").val() !=''){
                    params.resState = that.$("#keywordState").val();
                }
                $.blockUI({message: '请稍后'});

                that.$("#ResList").html("");
                that.$("#ResList").grid("destroy");
                //初始化grid
                resAction.getResList(params, function (result){
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        if(result.resultObject.list!=null  && result.resultObject.list != ""  ){
                            that.$("#ResList").grid({
                                data: result.resultObject.list,
                                height: 'auto',
                                colModel:[
                                    {name:'resName',     label:'物品名称',     width: 80, sortable: false},
                                    {name:'resCode',     label:'物品编号',     width: 80, sortable: false, hidden:false},
                                    {name:'resStandard', label:'规格',         width: 80, sortable: false},
                                    {name:'resPrice',    label:'价格',         width: 80, sortable: false},
                                    {name:'resLocation', label:'存放地',       width: 80, sortable: false},
                                    {name:'resState',    label:'物品状态',     width: 80, sortable: false},
                                    {name:'resEnabledate',label:'采购日期',     width: 80, sortable: false},
                                    {name:'resTypecode', label:'物品类型',     width: 80, sortable: false,
                                        formatter: function (cellval, opts, rowdata, _act) {
                                            var result = '';
                                            switch (cellval) {
                                                case 1 :
                                                    result = "可外借";
                                                    break;
                                                case 0:
                                                    result = "不外借";
                                                    break;
                                            }
                                            return result;
                                        }},

                                    // {name: 'createDate',   label: '创建日期', width: 80,       sortable: false,
                                    //     formatter: function(cellval, opts, rwdat, _act) {
                                    //         var dateStr = ''
                                    //         if(cellval){  dateStr = fish.dateTsFormatter(cellval);}
                                    //         return dateStr;
                                    //     }
                                    // },
                                    // { name: 'action',      label: '操作',         width: 200,   sortable: false,
                                    //     formatter: function (cellval, opts, rowdata, _act) {
                                    //         return '<div class="btn-group">' +
                                    //             '<button type="button" class="btn btn-link js-edit editProject" data-roleId="'+rowdata.mgrId+'">项目配置</button>' +
                                    //             '</div>'
                                    //     }
                                    // }
                                ],
                                onCellSelect : function( e, rowid, iCol, cellcontent ){
                                    console.log(rowid+" "+ iCol+" " +cellcontent);
                                    if (iCol == 1 && cellcontent != null){
                                        fish.popupView({
                                            url:"components/res/views/resView",
                                            viewOption:{resCode:cellcontent},
                                            width:"40%",
                                            callback: function (popup,view) {
                                            },
                                            close : function () {
                                                // that.searchRes();
                                            }
                                        }).then(function (view) {
                                            view.$("#saveProject").hide();
                                        });
                                    }
                                }
                            });
                        } else{
                            that.$("#ResList").append('<div style="text-align:center;">' +
                                // '<img src="marketing/css/base/images/none-1.png"'
                                +' style="height:100px;width:124px;text-align:center;margin:20px 0">'
                                +'<p style="width:100%;text-align:center;color:#d0d5e0;">抱歉！暂无数据</p></div>');
                            that.$('#Res-pagination').pagination("destroy");
                        }
                        that.userListPage(result.resultObject);//列表分页
                    }else{
                        fish.error(result.resultMsg);
                    }
                });
            },
            //项目列表分页
            userListPage:function(pageInfo){
                var that = this;
                that.$('#Res-pagination').pagination("destroy");
                that.$('#Res-pagination').pagination({
                    total     : pageInfo.pages,//总页数
                    records   : pageInfo.total, //查询到数据的总个数
                    displayNum: pageInfo.pages,//显示最大有效页数
                    rowNum    : pageInfo.pageSize,//每页显示条数
                    // page      : pageInfo.pageIndex,
                    start     : pageInfo.pageNum > 0 ? pageInfo.pageNum : 1,//设置初始页码start     : pageInfo.pageNum + 1 ,//设置初始页码
                    pgInput   :true,
                    pgRecText :true,
                    pgTotal   :true,//总计页数
                    rowtext   :null,//每页显示条数
                    onPageClick: function (e, eventData) {
                        that.initPurchaseGrid(eventData.page,eventData.rowNum);
                    }
                });
                that.$('#Res-pagination').find(".pagination").css({"margin":"5px 0"});
                //如当前页大于总页数，则置为总页数
                if (pageInfo.pageNum > pageInfo.pages && pageInfo.pages)
                    that.initResListGrid(pageInfo.pages,pageInfo.pageSize);
            },
            // 生效
            enable : function () {
                var that = this;
                var param = that.$('#ResList').grid("getSelection");
                param.admin = window.sessionStorage.getItem("userAccount");
                param.resState = "启用";
                $.blockUI({message: '请稍后'});
                resAction.ableRes(param, function (result) {
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        fish.success("生效成功");
                        that.reloadRes();
                    }else{
                        fish.error(result.resMsg);
                    }
                })
            },
            // 禁用
            disable : function () {
                var that = this;
                var param = that.$('#ResList').grid("getSelection");
                param.admin = window.sessionStorage.getItem("userAccount");
                param.resState = "禁用";
                $.blockUI({message: '请稍后'});
                resAction.ableRes(param, function (result) {
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        fish.success("禁用成功");
                        that.reloadRes();
                    }else{
                        fish.error(result.resultMsg);
                    }
                })
            },

            // 报废
            OutOfUse : function () {
                var that = this;
                var param = that.$('#ResList').grid("getSelection");
                param.admin = window.sessionStorage.getItem("userAccount");
                param.resState = "报废";
                $.blockUI({message: '请稍后'});
                resAction.outOfUse(param, function (result) {
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        fish.success("审核通过");
                        that.reloadRes();
                    }else{
                        fish.error(result.resMsg);
                    }
                })
            },
            // 录入物品
            addRes : function () {
                var that = this;
                fish.popupView({
                    url:"components/res/views/resView",
                    viewOption:{},
                    width:"40%",
                    callback: function (popup,view) {
                    },
                    close : function () {
                        that.searchRes();
                    }
                }).then(function (view) {

                });
            },
            // 删除物品
            deleteRes : function () {
                var that = this;
                var param = that.$('#ResList').grid("getSelection");
                param.admin = window.sessionStorage.getItem("User");
                //param.resEnableDate = new Date().getTime();
                //param.resScrapdate = new Date().getTime();
                $.blockUI({message: '请稍后'});
                resAction.deleteRes(param, function (result) {
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        fish.success("删除成功");
                        that.reloadRes();
                    }else{
                        fish.error(result.resMsg);
                    }
                })
            }

        });
        return ResManageView;
    });