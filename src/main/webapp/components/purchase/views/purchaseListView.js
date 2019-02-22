/**
 * 物品申购列表页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/purchaseList.html',
        '../actions/purchaseAction'
    ],
    function (tem, purchaseAction ) {
        var PurchaseListView = fish.View.extend({
            el:false,
            template:tem,
            pageIndex:1,
            pageSize:10,
            events:{
                'click #cancelPurchase':'cancelPurchase',
                'click #addPurchase':'addPurchase',
                'click #OKPurchase' : 'OKPurchase',
                'click #NOPurchase' : 'NOPurchase'
            },
            initialize: function () {
                var that = this;
                that.searchPurchase();
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
                        that.searchPurchase();
                    }
                });
                that.$("#keywordAccount").keydown(function(event) {
                    if (event.keyCode == "13") {
                        that.searchPurchase();
                    }
                });
                that.$("#searchByAccount").click(function () {
                    that.searchPurchase();
                })
            },
            //查询项目
            searchPurchase:function(){
                var that = this;
                //that.$('#projectList').grid("destroy");
                that.initPurchaseGrid(that.pageIndex,that.pageSize);
            },
            //重新加载当前页
            reloadPurchase:function () {
                var that = this;
                var pagination = $('#purchaseList-pagination .active').attr("data-page");
                if (pagination == undefined ) pagination = 1;//当前无数据时即分页值为空时，为免查询报错，赋值为1
                that.initPurchaseGrid(pagination,that.pageSize);
            },
            //初始化预约历史列表
            initPurchaseGrid:function(pageNum,pageSize){
                var that = this;
                var purchase = {},page = {};
                page.pageSize = (pageSize == null ? 10 : pageSize);
                page.pageIndex = (pageNum == null ? 1 : pageNum);
                if(that.$("#keywordCode").val() !=''){
                    purchase.buyCode = that.$("#keywordCode").val();
                }
                if(that.$("#keywordAccount").val() !=''){
                    purchase.buyUseraccount = that.$("#keywordAccount").val();
                }
                $.blockUI({message: '请稍后'});
                var params = {purchase:purchase,page:page};
                that.$("#purchaseList").html("");
                that.$("#purchaseList").grid("destroy");
                //初始化grid
                purchaseAction.getPurchaseList(JSON.stringify(params), function (result){
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        if(result.resultObject.list!=null  && result.resultObject.list != ""  ){
                            that.$("#purchaseList").grid({
                                data: result.resultObject.list,
                                height: 'auto',
                                colModel:[
                                    {name:'buyCode',         label:'采购编号',     width: 80, sortable: false},
                                    {name:'buyResname',      label:'物品名称',     width: 80, sortable: false},
                                    {name:'buyResprice',     label:'物品价格',     width: 80, sortable: false},
                                    {name:'buyResstandard',  label:'物品规格',     width: 80, sortable: false},
                                    {name:'buyWay',          label:'购买途径',     width: 80, sortable: false},
                                    {name:'buyUseraccount',  label:'申购用户',     width: 80, sortable: false, hidden:true},
                                    {name:'buyUsername',     label:'申购人',       width: 80, sortable: false},
                                    {name:'buyState',        label:'采购状态',     width: 80, sortable: false},
                                    {name:'buyReason',       label:'申购原因',     width: 80, sortable: false},
                                    {name:'buyApplydate',    label:'申购日期',     width: 80, sortable: false},
                                    {name:'buyDate',         label:'购买日期',     width: 80, sortable: false},
                                ],
                                onCellSelect : function( e, rowid, iCol, cellcontent ){
                                    if (iCol == 0 && cellcontent != null){
                                        fish.popupView({
                                            url:"components/purchase/views/purchaseView",
                                            viewOption:{buyCode:cellcontent},
                                            width:"40%",
                                            callback: function (popup,view) {
                                            },
                                            close : function () {
                                                // that.searchRes();
                                            }
                                        }).then(function (view) {
                                            view.$("#savePurchase").hide();
                                        });
                                    }
                                }
                            });
                        } else{
                            that.$("#purchaseList").append('<div style="text-align:center;"><img src="marketing/css/base/images/none-1.png"'
                                +' style="height:100px;width:124px;text-align:center;margin:20px 0">'
                                +'<p style="width:100%;text-align:center;color:#d0d5e0;">抱歉！暂无数据</p></div>');
                            that.$('#purchaseList-pagination').pagination("destroy");
                        }
                        that.reserveListPage(result.resultObject);//列表分页
                    }else{
                        fish.error(result.resultMsg);
                    }
                });
            },
            //项目列表分页
            reserveListPage:function(pageInfo){
                var that = this;
                that.$('#purchaseList-pagination').pagination("destroy");
                that.$('#purchaseList-pagination').pagination({
                    total     : pageInfo.pages,//总页数
                    records   : pageInfo.total, //查询到数据的总个数
                    displayNum: pageInfo.pages,//显示最大有效页数
                    rowNum    : pageInfo.pageSize,//每页显示条数
                    //page      : pageInfo.pageIndex,
                    start     : pageInfo.pageNum > 0 ? pageInfo.pageNum : 1,//设置初始页码
                    pgInput   :true,
                    pgRecText :true,
                    pgTotal   :true,//总计页数
                    rowtext   :null,//每页显示条数
                    onPageClick: function (e, eventData) {
                        that.initPurchaseGrid(eventData.page,eventData.rowNum);
                    }
                });
                that.$('#purchaseList-pagination').find(".pagination").css({"margin":"5px 0"});
                //如当前页大于总页数，则置为总页数
                if (pageInfo.pageNum > pageInfo.pages && pageInfo.pages)
                    that.initPurchaseGrid(pageInfo.pages,pageInfo.pageSize);
            },
            // 新增采购
            addPurchase : function () {
                var that = this;
                var user = {
                    buyUseraccount:window.sessionStorage.getItem("User"),
                    buyUsername:window.sessionStorage.getItem("Name")
                };
                fish.popupView({
                    url:"components/purchase/views/purchaseView",
                    viewOption:{user:user},
                    width:"40%",
                    callback: function (popup,view) {
                    },
                    close : function () {
                        that.searchPurchase();
                    }
                }).then(function (view) {
                    // view.$("#saveProject").hide();
                });
            },
            // 取消申购
            cancelPurchase : function () {
                var that = this;
                var selRow = that.$('#purchaseList').grid("getSelection");
                if (selRow.buyCode == undefined ) {
                    fish.info("请选中申购记录");
                    return ;
                }
                var param = {buyCode : selRow.buyCode};
                $.blockUI({message:"请稍后"});
                purchaseAction.cancelPurchase(param, function (result) {
                    $.unblockUI();
                    if (result && result.resultCode == 1){
                        fish.success("取消申购成功！");
                        that.reloadPurchase();
                    }else{
                        fish.error(result.resultMsg);
                    }
                })
            },
            // 同意申购
            OKPurchase : function () {
                var that = this;
                var selRow = that.$('#purchaseList').grid("getSelection");
                if (selRow.buyCode == undefined ) {
                    fish.info("请选中申购记录");
                    return ;
                }
                var param = {buyCode : selRow.buyCode};
                param.buyState = "同意申购";
                param.buyAdmincode = window.sessionStorage.getItem("User");
                param.buyAdminname = window.sessionStorage.getItem("Name");
                $.blockUI({message:"请稍后"});
                purchaseAction.updatePurchase(param, function (result) {
                    $.unblockUI();
                    if (result && result.resultCode == 1){
                        fish.success("同意申购！");
                        that.reloadPurchase();
                    }else{
                        fish.error(result.resultMsg);
                    }
                })
            },
            // 拒绝申购
            NOPurchase : function () {
                var that = this;
                var selRow = that.$('#purchaseList').grid("getSelection");
                if (selRow.buyCode == undefined ) {
                    fish.info("请选中申购记录");
                    return ;
                }
                var param = {buyCode : selRow.buyCode};
                param.buyState = "拒绝采购";
                param.buyAdmincode = window.sessionStorage.getItem("User");
                param.buyAdminname = window.sessionStorage.getItem("Name");
                $.blockUI({message:"请稍后"});
                purchaseAction.updatePurchase(param, function (result) {
                    $.unblockUI();
                    if (result && result.resultCode == 1){
                        fish.success("拒绝申购！");
                        that.reloadPurchase();
                    }else{
                        fish.error(result.resultMsg);
                    }
                })
            }
        });
        return PurchaseListView;
    });