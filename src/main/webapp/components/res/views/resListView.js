/**
 * 物品列表页面- 普通用户
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/resList.html',
        '../actions/resAction',
    ],
    function (tem, resAction, registerView) {
        var ResListView = fish.View.extend({
            el:false,
            template:tem,
            events:{
                'click #resReserve':'reserve'
            },
            initialize: function () {
                var that = this;
                that.searchAbleRes();
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
                        that.searchAbleRes();
                    }
                });
            },
            //查询用户
            searchAbleRes:function(){
                var that = this;
                //that.$('#projectList').grid("destroy");
                that.initAbleResListGrid(that.pageIndex,that.pageSize);
            },
            //重新加载当前页
            reloadAbleRes:function () {
                var that = this;
                var pagination = $('#ResAble-pagination .active').attr("data-page");
                if (pagination == undefined ) pagination = 1;//当前无数据时即分页值为空时，为免查询报错，赋值为1
                that.initAbleResListGrid(pagination,that.pageSize);
            },
            //初始化用户列表
            initAbleResListGrid:function(pageNum,pageSize){
                var that = this;
                var params = {};
                params.pageIndex = pageNum;
                params.pageSize = pageSize;
                params.res = {resTypecode:1};

                if(that.$("#keyword").val() !=''){
                    params.userName = that.$("#keyword").val();
                }
                $.blockUI({message: '请稍后'});

                that.$("#ResAbleList").html("");
                that.$("#ResAbleList").grid("destroy");
                //初始化grid
                resAction.getResList(params, function (result){
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        if(result.resultObject.list!=null  && result.resultObject.list != ""  ){
                            that.$("#ResAbleList").grid({
                                data: result.resultObject.list,
                                height: 'auto',
                                colModel:[
                                    {name:'resName',     label:'物品名称',     width: 80, sortable: false},
                                    {name:'resCode',     label:'物品编号',     width: 80, sortable: false, hidden:true},
                                    {name:'resStandard', label:'规格',         width: 80, sortable: false},
                                    {name:'resPrice',    label:'价格',         width: 80, sortable: false},
                                    {name:'resLocation', label:'存放地',     width: 80, sortable: false},
                                    {name:'resState',    label:'物品状态', width: 80, sortable: false}

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
                                ]
                            });
                        } else{
                            that.$("#ResAbleList").append('<div style="text-align:center;"><img src="marketing/css/base/images/none-1.png"'
                                +' style="height:100px;width:124px;text-align:center;margin:20px 0">'
                                +'<p style="width:100%;text-align:center;color:#d0d5e0;">抱歉！暂无数据</p></div>');
                            that.$('#ResAble-pagination').pagination("destroy");
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
                that.$('#ResAble-pagination').pagination("destroy");
                that.$('#ResAble-pagination').pagination({
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
                that.$('#Res-pagination').find(".pagination").css({"margin":"5px 0"});
                //如当前页大于总页数，则置为总页数
                if (pageInfo.pageNum > pageInfo.pages && pageInfo.pages)
                    that.initResListGrid(pageInfo.pages,pageInfo.pageSize);
            },
            // 生效
            reserve : function () {
                var that = this;
                var param = that.$('#ResAbleList').grid("getSelection");
                $.blockUI({message: '请稍后'});
                resAction.ableRes(param, function (result) {
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        fish.success("生效成功");
                        that.reloadAbleRes();
                    }else{
                        fish.error(result.resMsg);
                    }
                })
            }

        });
        return ResListView;
    });