/**
 * 预约列表页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/reserveList.html',
        '../actions/reserveAction',
        '../../register/views/registerView'
    ],
    function (tem, reserveAction, registerView) {
        var ReserveListView = fish.View.extend({
            el:false,
            template:tem,
            events:{
                'click #returnRes':'returnRes',
                'click #applyLend':'applyLend'
            },
            initialize: function () {
                var that = this;
                that.searchProject();
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
                that.$("#keyword").keydown(function(event) {
                    if (event.keyCode == "13") {
                        that.searchProject();
                    }
                });
            },
            //查询项目
            searchProject:function(){
                var that = this;
                //that.$('#projectList').grid("destroy");
                that.initReserveGrid(that.pageIndex,that.pageSize);
            },
            //重新加载当前页
            reloadProjects:function () {
                var that = this;
                var pagination = $('#history-pagination .active').attr("data-page");
                if (pagination == undefined ) pagination = 1;//当前无数据时即分页值为空时，为免查询报错，赋值为1
                that.initReserveGrid(pagination,that.pageSize);
            },
            //初始化预约历史列表
            initReserveGrid:function(pageNum,pageSize){
                var that = this;
                var params = {};
                params.pageIndex = pageNum;
                params.pageSize = pageSize;

                if(that.$("#keyword").val() !=''){
                    params.userName = that.$("#keyword").val();
                }
                $.blockUI({message: '请稍后'});

                that.$("#reserveHistoryList").html("");
                that.$("#reserveHistoryList").grid("destroy");
                //初始化grid
                reserveAction.getReserveList(params, function (result){
                    $.unblockUI();
                    if(result && result.resultCode==0){
                        if(result.resultObject.userLists!=null  && result.resultObject.userLists != ""  ){
                            that.$("#reserveHistoryList").grid({
                                data: result.resultObject.reserveLists,
                                height: 'auto',
                                colModel:[
                                    {name:'resName',     label:'物品名称',     width: 80, sortable: false},
                                    {name:'resCode',     label:'物品编号',     width: 80, sortable: false},
                                    {name:'userAccount', label:'借用人',       width: 80, sortable: false},
                                    {name:'startDate',   label:'借用日期',     width: 80, sortable: false},
                                    {name:'endDate',     label:'归还日期',     width: 80, sortable: false},
                                    {name:'reserveReason',   label:'借用原因', width: 80, sortable: false},
                                    {name:'userEmail',   label:'审批人',       width: 80, sortable: false}
                                ]
                            });
                        } else{
                            that.$("#reserveHistoryList").append('<div style="text-align:center;"><img src="marketing/css/base/images/none-1.png"'
                                +' style="height:100px;width:124px;text-align:center;margin:20px 0">'
                                +'<p style="width:100%;text-align:center;color:#d0d5e0;">抱歉！暂无数据</p></div>');
                            that.$('#history-pagination').pagination("destroy");
                        }
                        that.reserveListPage(result.resultObject.pageInfo);//列表分页
                    }else{
                        fish.error(result.resultMsg);
                    }
                });
            },
            //项目列表分页
            reserveListPage:function(pageInfo){
                var that = this
                that.$('#history-pagination').pagination("destroy");
                that.$('#history-pagination').pagination({
                    total     : pageInfo.pageCount,//总页数
                    records   : pageInfo.total, //查询到数据的总个数
                    displayNum: pageInfo.pageSize,//显示最大有效页数
                    rowNum    : pageInfo.pageSize,//每页显示条数
                    //page      : pageInfo.pageIndex,
                    start     :pageInfo.pageIndex,//设置初始页码
                    pgInput   :true,
                    pgRecText :true,
                    pgTotal   :true,//总计页数
                    rowtext   :null,//每页显示条数
                    onPageClick: function (e, eventData) {
                        that.initReserveGrid(eventData.page,eventData.rowNum);
                    }
                });
                that.$('#history-pagination').find(".pagination").css({"margin":"5px 0"});
                //如当前页大于总页数，则置为总页数
                if (pageInfo.pageIndex > pageInfo.pageCount && pageInfo.pageCount)
                    that.initReserveGrid(pageInfo.pageCount,pageInfo.pageSize);
            },
            // 归还物品
            returnRes : function () {
                var that = this;
                var param = that.$('#reserveHistoryList').grid("getSelection");
                if (param == {}) {
                    fish.info("请选中物品");
                    return ;
                };
                $.blockUI({message:"请稍后"});
                reserveAction.returnRes(param, function (result) {
                    $.unblockUI();
                    if (result & result.resultCode == 0){
                        fish.success("归还物品成功！");
                        that.reloadProjects();
                    }else{
                        fish.error(result.resultMsg);
                    }
                })
            },
            // 申请转借物品
            applyLend : function () {
                var that = this;
                var param = that.$('#reserveHistoryList').grid("getSelection");
                if (param == {}) {
                    fish.info("请选中物品");
                    return ;
                }else param.applyUser = window.localStorage.getItem("userAccount");
                $.blockUI({message:"请稍后"});
                reserveAction.applyLend(param, function (result) {
                    $.unblockUI();
                    if (result & result.resultCode == 0){
                        fish.success("申请转借成功！");
                        that.reloadProjects();
                    }else{
                        fish.error(result.resultMsg);
                    }
                })

            }
        });
        return ReserveListView;
    });