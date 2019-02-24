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
            events:{},
            initialize: function () {
                var that = this;
                that.searchRes();
            },
            afterRender: function () {
                var that = this;
                that.loadPageHeader();
            },
            loadPageHeader : function () {
                var that = this;
                var $tabs = that.$("#ResManage_tabs_border").tabs();
                var $select = that.$('#ResManage_multiselect').multiselect({
                    dataTextField:'name',
                    dataValueField:'value',
                    dataSource:[
                        {name:"物品名称", value:"resName"},
                        {name:"物品编号", value:"resCode"},
                        {name:"物品价格", value:"resPrice"},
                        {name:"存放地",   value:"resLocation"},
                        {name:"物品状态", value:"resState"},
                        {name:"物品类型", value:"resClass"},
                        {name:"物品级别", value:"resType"},
                        {name:"采购日期", value:"resEnabledate"},
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
                            that.$("#ResManage_search_condition_form").html("");
                            that.searchRes();
                            break;
                        case 'btn8':
                            $select.isValid();
                            break;
                        case 'resEnable':
                            that.actionBtn(1);
                            break;
                        case 'resDisable':
                            that.actionBtn(4);
                            break;
                        case 'OutOfUse':
                            that.actionBtn(5);
                            break;
                        case 'addRes':
                            that.addRes();
                            break;
                        case 'deleteRes':
                            that.deleteRes();
                            break;
                        case 'editResCom':
                            that.editResCom();
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
                that.$("#ResManage_search_condition_form").html(HTML);
                for (var index in arr){
                    if (arr[index].name == "物品类型"){
                        that.$("#keywordresClass").combobox({
                            placeholder: 'Select Res Class',
                            dataTextField: 'name',
                            dataValueField: 'value',
                            dataSource: [
                                {name: '可外借', value: 1},
                                {name: '不可外借', value: 2}
                            ]
                        });
                    }else if (arr[index].name == "物品级别"){
                        that.$("#keywordresType").combobox({
                            placeholder: 'Select Res Type',
                            dataTextField: 'name',
                            dataValueField: 'value',
                            dataSource: [
                                {name: '企业级', value: 1},
                                {name: '分公司级', value: 2},
                                {name: '部门级', value: 3},
                                {name: '其他', value: 4}
                            ]
                        });
                    }else if (arr[index].name == "采购日期"){
                        that.$("#keywordresEnabledate").datetimepicker({
                            buttonIcon: ''
                        });
                    }else if (arr[index].name == "物品价格"){
                        that.$("#keywordresPrice").currencybox({
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
                that.$("#ResManage_search_condition_form input").keydown(function(event) {
                    if (event.keyCode == "13") {
                        that.searchRes();
                    }
                });
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
                var page = {pageSize : (pageSize == null ? 10 : pageSize),
                    pageIndex : (pageNum == null ? 1 : pageNum)};
                var res = that.$('#ResManage_search_condition_form').form().form("value");
                res.resComcode = window.sessionStorage.getItem("ComCode") == "undefined" ? null : window.sessionStorage.getItem("ComCode");
                var params = {res:res,page:page};
                $.blockUI({message: '请稍后'});
                that.$("#ResList").html("");
                that.$("#ResList").grid("destroy");
                //初始化grid
                resAction.getResList(JSON.stringify(params), function (result){
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        if(result.resultObject.list!=null  && result.resultObject.list != ""  ){
                            that.$("#ResList").grid({
                                data: result.resultObject.list,
                                height: 'auto',
                                colModel:[
                                    {name:'resCode',     label:'物品编号',     width: 80, sortable: false},
                                    {name:'resName',     label:'物品名称',     width: 80, sortable: false},
                                    {name:'resStandard', label:'规格',         width: 80, sortable: false},
                                    {name:'resPrice',    label:'价格',         width: 80, sortable: false},
                                    {name:'resLocation', label:'存放地',       width: 80, sortable: false},
                                    {name:'resState',    label:'物品状态',     width: 80, sortable: false,
                                        formatter: function (cellval, opts, rowdata, _act) {
                                            var result = '';
                                            switch (cellval) {
                                                case 1 :
                                                    result = "正常";
                                                    break;
                                                case 3:
                                                    result = "借出";
                                                    break;
                                                case 2 :
                                                    result = "待审核";
                                                    break;
                                                case 4:
                                                    result = "禁用";
                                                    break;
                                                case 5 :
                                                    result = "报废";
                                                    break;
                                            }
                                            return result;
                                    }},
                                    {name:'resEnabledate',label:'采购日期',    width: 80, sortable: false, hidden:true},
                                    {name:'resClass',    label:'物品类型',     width: 80, sortable: false,
                                        formatter: function (cellval, opts, rowdata, _act) {
                                            var result = '';
                                            switch (cellval) {
                                                case 1 :
                                                    result = "可外借";
                                                    break;
                                                case 2:
                                                    result = "不外借";
                                                    break;
                                            }
                                            return result;
                                    }},
                                    {name:'resType',     label:'物品级别',      width: 80, sortable: false, hidden:true,
                                        formatter: function (cellval, opts, rowdata, _act) {
                                            var result = '';
                                            switch (cellval) {
                                                case 1 :
                                                    result = "企业级";
                                                    break;
                                                case 2:
                                                    result = "分公司级";
                                                    break;
                                                case 3 :
                                                    result = "部门级";
                                                    break;
                                                case 10 :
                                                    result = "其他";
                                                    break;
                                            }
                                            return result;
                                        }},
                                    {name:'resComcode', label:'所属组织编号', width: 80, sortable: false, hidden:true},
                                    {name:'resComname', label:'所属组织',     width: 80, sortable: false}

                                ],
                                onCellSelect : function( e, rowid, iCol, cellcontent ){
                                    console.log(rowid+" "+ iCol+" " +cellcontent);
                                    if (iCol == 0 && cellcontent != null){
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
                        that.initResListGrid(eventData.page,eventData.rowNum);
                    }
                });
                that.$('#Res-pagination').find(".pagination").css({"margin":"5px 0"});
                //如当前页大于总页数，则置为总页数
                if (pageInfo.pageNum > pageInfo.pages && pageInfo.pages)
                    that.initResListGrid(pageInfo.pages,pageInfo.pageSize);
            },
            // 生效/禁用
            actionBtn : function (code) {
                var that = this;
                var selRow = that.$('#ResList').grid("getSelection");
                var param = {resCode:selRow.resCode, resType:selRow.resType};
                param.admin = window.sessionStorage.getItem("User");
                if (param.resCode == null ){
                    fish.error("未选中记录");
                    return false;
                }else if(window.sessionStorage.getItem("Lv") > param.resType){
                    fish.error("权限不足");
                    return false;
                }else if(code == 888888){
                    fish.error("权限不足");
                    return false;
                }else{
                    if (param.resState == 2 && code == 3 && code == 4 && code == 5) { //待审核状态下，借出、禁用和报废
                        fish.error("请先审核!");
                        return false;
                    }
                    param.resState = code;
                }
                $.blockUI({message: '请稍后'});
                resAction.updateRes(param, function (result) {
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        fish.success("操作成功");
                        that.reloadRes();
                    }else fish.error(result.resultMsg);
                })
            },
            // 录入物品
            addRes : function () {
                var that = this;
                fish.popupView({
                    url:"components/res/views/resView",
                    viewOption:{},
                    width:"40%",
                    callback: function (popup,view) {},
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
                $.blockUI({message: '请稍后'});
                resAction.deleteRes(param, function (result) {
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        fish.success("删除成功");
                        that.reloadRes();
                    }else fish.error(result.resultMsg);
                })
            },
            editResCom : function () {
                var that = this;
                var selRow1 = that.$('#ResList').grid("getSelection");
                if (selRow1.resCode == null){
                    fish.error("未选中记录！");
                    return false;
                }
                fish.popupView({
                    url:"components/com/views/comManageView",
                    viewOption:{},
                    width:"60%",
                    callback: function (popup,view) {},
                    close : function () {
                        // that.searchRes();
                        that.reloadRes();
                    }
                }).then(function (view) {
                    view.$("#comManage_tabs_border>ul>li:nth-of-type(1)").hide();
                    view.$("#comManage_table_page_1").hide();
                    view.$(".modal-body").append('<div class="attr-select-footer modal-footer">' +
                        '<button type="button" class="btn btn-primary confirm_attention_select_btn" id="saveResCom">保存</button>' +
                        '<button type="button" class="btn btn-default" data-dismiss="modal" >返回</button>' +
                        '</div>');
                    view.$("#saveResCom").click(function (e) {
                        var selRow = view.$('#ComList').grid("getSelection");
                        var param = {resCode:selRow1.resCode, resComcode:selRow.comCode,
                            resComname:selRow.comName, resType:selRow.comType};
                        param.admin = window.sessionStorage.getItem("User");
                        if (param.resComcode == null || param.resCode == null){
                            fish.error("未选中记录");
                            return false;
                        }else if(window.sessionStorage.getItem("Lv") > selRow.comType){
                            fish.error("权限不足");
                            return false;
                        }else if(selRow.comState != 1){
                            fish.error("请选择处于正常状态的组织！");
                            return false;
                        }
                        $.blockUI({message: '请稍后'});
                        resAction.updateRes(param, function (result) {
                            $.unblockUI();
                            if(result && result.resultCode==1){
                                fish.success("操作成功");
                                view.popup.close();
                            }else fish.error(result.resultMsg);
                        })
                    })
                });
            }
        });
        return ResManageView;
    });