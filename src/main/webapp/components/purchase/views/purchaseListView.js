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
                'click #cancelPurchase':'cancelPurchase'
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
                that.$("#keyword").keydown(function(event) {
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
                var params = {};
                params.pageIndex = pageNum;
                params.pageSize = pageSize;

                if(that.$("#keyword").val() !=''){
                    params.userName = that.$("#keyword").val();
                }
                $.blockUI({message: '请稍后'});

                that.$("#purchaseList").html("");
                that.$("#purchaseList").grid("destroy");
                //初始化grid
                purchaseAction.getPurchaseList(params, function (result){
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        if(result.resultObject.list!=null  && result.resultObject.list != ""  ){
                            that.$("#purchaseList").grid({
                                data: result.resultObject.list,
                                height: 'auto',
                                colModel:[
                                    {name:'BuyResName',      label:'物品名称',     width: 80, sortable: false},
                                    {name:'BuyResPrice',     label:'物品价格',     width: 80, sortable: false},
                                    {name:'BuyResStandard',  label:'物品规格',     width: 80, sortable: false},
                                    {name:'BuyUserAccount',  label:'申购人',       width: 80, sortable: false},
                                    {name:'BuyReason',       label:'申购原因',     width: 80, sortable: false}
                                ]
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
            // 取消申购
            cancelPurchase : function () {
                var that = this;
                var param = that.$('#purchaseList').grid("getSelection");
                if (param == {}) {
                    fish.info("请选中申购记录");
                    return ;
                }
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
            }
        });
        return PurchaseListView;
    });