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
                that.loadPageHeader();
            },
            loadPageHeader : function () {
                var that = this;
                var $tabs = that.$("#PurchaseManage_tabs_border").tabs();
                var $select = that.$('#PurchaseManage_multiselect').multiselect({
                    dataTextField:'name',
                    dataValueField:'value',
                    dataSource:[
                        {name:"物品名称", value:"buyResname"},
                        {name:"物品价格", value:"buyResprice"},
                        {name:"购买途径", value:"buyWay"},
                        {name:"申购用户", value:"buyUseraccount"},
                        {name:"采购状态", value:"buyState"},
                        {name:"物品规格", value:"buyResstandard"},
                        {name:"申购人", value:"buyUsername"},
                        {name:"申购原因", value:"buyReason"},
                        {name:"申购日期", value:"buyApplydate"},
                        {name:"购买日期", value:"buyDate"}
                    ]
                });
                that.$('button').click(function(e) {
                    var $target = $(e.target);
                    switch ($target.attr('id')) {
                        case 'btn1':
                            $select.multiselect('enable');
                            break;
                        case 'btn2':
                            $select.multiselect('disable');
                            break;
                        case 'btn3':
                            that.loadSearchCondition($select.multiselect('selectedItems'));
                            break;
                        case 'btn6':
                            //三种写法效果一样
                            $select.multiselect('value', []); //
                            that.$("#PurchaseManage_search_condition_form").html("");
                            that.searchPurchase();
                            break;
                        case 'btn8':
                            $select.isValid();
                            break;
                    }
                });
            },
            loadSearchCondition : function(arr) {
                var that = this;
                var HTML = "";
                for(var val in arr){
                    HTML += '<input name="'+ arr[val].value +'" id="keyword' + arr[val].value +
                        '" style="width: 200px;margin-right: 10px;" class="form-control" placeholder="输入'
                        + arr[val].name + '查询">';
                }
                that.$("#PurchaseManage_search_condition_form").html(HTML);
                for (var index in arr){
                    if (arr[index].name == "申购日期"){
                        that.$("#keywordbuyApplydate").datetimepicker({
                            buttonIcon: ''
                        });
                    }else if (arr[index].name == "购买日期"){
                        that.$("#keywordbuyDate").datetimepicker({
                            buttonIcon: ''
                        });
                    }else if (arr[index].name == "物品价格"){
                        that.$("#keywordbuyResprice").currencybox({
                            numeralDecimalScale: 2, //默认为2
                            prefix: '$', //默认为''
                            suffix: '元',
                            thousandsSeparator: ",", //默认为''
                            numeralThousandsGroupStyle: true,  //默认为false
                        });
                    }
                }

                //注册页面事件
                that.initPageEvents();
            },
            //注册页面事件
            initPageEvents:function(parma){
                var that = this;
                //项目名称查询回车事件
                that.$("#PurchaseManage_search_condition_form input").keydown(function(event) {
                    if (event.keyCode == "13") {
                        that.searchPurchase();
                    }
                });
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
                var page = {pageSize : (pageSize == null ? 10 : pageSize),
                    pageIndex : (pageNum == null ? 1 : pageNum)};
                var purchase = that.$("#PurchaseManage_search_condition_form").form().form('value');
                var params = {purchase:purchase,page:page};
                $.blockUI({message: '请稍后'});
                that.$("#purchaseList").html("");
                that.$("#purchaseList").grid("destroy");
                //初始化grid
                purchaseAction.getPurchaseList(JSON.stringify(params), function (result){
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        if(result.resultObject.list!=null  && result.resultObject.list != ""  ){
                            var $purchaseGrid = that.$("#purchaseList").grid({
                                data: result.resultObject.list,
                                height: 'auto',
                                colModel:[
                                    {name:'buyCode',         label:'采购编号',     width: 80, sortable: false, hidden:true},
                                    {name:'buyResname',      label:'物品名称',     width: 80, sortable: false},
                                    {name:'buyResprice',     label:'物品价格',     width: 80, sortable: false},
                                    {name:'buyResstandard',  label:'物品规格',     width: 80, sortable: false},
                                    {name:'buyWay',          label:'购买途径',     width: 80, sortable: false},
                                    {name:'buyUseraccount',  label:'申购用户',     width: 80, sortable: false, hidden:true},
                                    {name:'buyUsername',     label:'申购人',       width: 80, sortable: false},
                                    {name:'buyState',        label:'采购状态',     width: 80, sortable: false},
                                    {name:'buyReason',       label:'申购原因',     width: 80, sortable: false, hidden:true},
                                    {name:'buyApplydate',    label:'申购日期',     width: 80, sortable: false},
                                    {name:'buyDate',         label:'购买日期',     width: 80, sortable: false},
                                ],
                                onCellSelect : function( e, rowid, iCol, cellcontent ){
                                    if (iCol == 1 && cellcontent != null){
                                        fish.popupView({
                                            url:"components/purchase/views/purchaseView",
                                            viewOption:{buyCode:$purchaseGrid.grid("getRowData",rowid).buyCode},
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
                            that.$("#purchaseList").append('<div style="text-align:center;">' +
                                // '<img src="marketing/css/base/images/none-1.png"'
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