/**
 * 用户管理页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/userManage.html',
        '../actions/userAction'
    ],
    function (tem, UserAction) {
        var UserManageView = fish.View.extend({
            el:false,
            template:tem,
            events:{},
            initialize: function () {
                var that = this;
                that.searchUser();
            },
            afterRender: function () {
                var that = this;
                that.loadPageHeader();
            },
            loadPageHeader : function () {
                var that = this;
                var $tabs = that.$("#userManage_tabs_border").tabs();
                var $select = that.$('#userManage_multiselect').multiselect({
                    dataTextField:'name',
                    dataValueField:'value',
                    dataSource:[
                        {name:"用户名",   value:"userAccount"},
                        {name:"用户身份", value:"userName"},
                        {name:"手机号",   value:"userPhone"},
                        {name:"邮箱",     value:"userEmail"},
                        {name:"用户状态", value:"userDisable"},
                        {name:"用户类型", value:"userType"},
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
                            that.$("#userManage_search_condition_form").html("");
                            that.searchUser();
                            break;
                        case 'btn8':
                            $select.isValid();
                            break;
                        case 'UserEnable':
                            that.actionBtn(1);
                            break;
                        case 'UserDisable':
                            that.actionBtn(3);
                            break;
                        case 'UserResetPassword':
                            that.actionBtn(666666);
                            break;
                        case 'UserCheckOk':
                            that.actionBtn(1);
                            break;
                        case 'UserCheckNotOk':
                            that.actionBtn(5);
                            break;
                        case 'UserResManageAdd':
                            that.actionBtn(888888);
                            break;
                        case 'UserResManageRemove':
                            that.actionBtn(888889);
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
                that.$("#userManage_search_condition_form").html(HTML);
                for (var index in arr){
                    if (arr[index].name == "用户状态"){
                        that.$("#keyworduserDisable").combobox({
                            placeholder: 'Select User State',
                            dataTextField: 'name',
                            dataValueField: 'value',
                            dataSource: [
                                {name: '启用', value: 1},
                                {name: '禁用', value: 0},
                                {name: '待审核', value: -1},
                                {name: '审核不通过', value: -2}
                            ],
                        });
                    }else if (arr[index].name == "用户类型"){
                        that.$("#keyworduserType").combobox({
                            placeholder: 'Select User Type',
                            dataTextField: 'name',
                            dataValueField: 'value',
                            dataSource: [
                                {name: '管理员', value: 1},
                                {name: '普通用户', value: -1}
                            ],
                        });
                    }else if (arr[index].name == "手机号"){
                        that.$("#keyworduserPhone").attr("type","number");
                    }
                }

                //注册页面事件
                that.initPageEvents();
            },
            //注册页面事件
            initPageEvents:function(parma){
                var that = this;
                //项目名称查询回车事件
                that.$("#userManage_search_condition_form input").keydown(function(event) {
                    if (event.keyCode == "13") {
                        that.searchUser();
                    }
                });
            },
            //查询用户
            searchUser:function(){
                var that = this;
                //that.$('#projectList').grid("destroy");
                that.initUserGrid(that.pageIndex,that.pageSize);
            },
            //重新加载当前页
            reloadUsers:function () {
                var that = this;
                var pagination = $('#user-pagination .active').attr("data-page");
                if (pagination == undefined ) pagination = 1;//当前无数据时即分页值为空时，为免查询报错，赋值为1
                that.initUserGrid(pagination,that.pageSize);
            },
            //初始化用户列表
            initUserGrid:function(pageNum,pageSize){
                var that = this;
                var page = {pageSize : (pageSize == null ? 10 : pageSize),
                    pageIndex : (pageNum == null ? 1 : pageNum)};
                var user = that.$("#userManage_search_condition_form").form().form('value');
                user.userType = window.sessionStorage.getItem("Lv") == "undefined" ? null : window.sessionStorage.getItem("Lv");
                var params = {user:user,page:page};
                $.blockUI({message: '请稍后'});
                that.$("#UserList").html("");
                that.$("#UserList").grid("destroy");
                //初始化grid
                UserAction.getUserList(JSON.stringify(params),function (result){
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        if(result.resultObject.list!=null  && result.resultObject.list != ""  ){
                            that.$("#UserList").grid({
                                data: result.resultObject.list,
                                height: 'auto',
                                colModel:[
                                    {name:'userAccount', label:'用户名',    width: 80,  sortable: false},
                                    {name:'userName',    label:'真实身份',  width: 120, sortable: false},
                                    {name:'userPhone',   label:'手机号',    width: 120, sortable: false},
                                    {name:'userEmail',   label:'邮箱',      width: 120, sortable: false},
                                    {name:'userState', label:'用户状态',    width: 120, sortable: false,
                                        formatter: function (cellval, opts, rowdata, _act) {
                                            var result = '';
                                            switch (cellval) {
                                                case 1 :
                                                    result = "正常";
                                                    break;
                                                case 2:
                                                    result = "待审核";
                                                    break;
                                                case 3:
                                                    result = "禁用";
                                                    break;
                                                case 4:
                                                    result = "注销";
                                                    break;
                                                case 5:
                                                    result = "审核不通过";
                                                    break;
                                            }
                                            return result;
                                        }},
                                    {name:'userType', label:'用户类型',     width: 120, sortable: false,
                                        formatter: function (cellval, opts, rowdata, _act) {
                                            var result = '';
                                            switch (cellval) {
                                                case 1 :
                                                    result = "企业用户";
                                                    break;
                                                case 2:
                                                    result = "分公司用户";
                                                    break;
                                                case 3 :
                                                    result = "部门用户";
                                                    break;
                                                case 10:
                                                    result = "普通用户";
                                                    break;
                                                case 0:
                                                    result = "系统管理员";
                                                    break;
                                            }
                                            return result;
                                    }},
                                    {name:'userCreateddate',label:'注册时间',width: 120, sortable: false, hidden:true},
                                    {name:'userComcode',  label:'所属组织编号', width: 80, sortable: false, hidden:true},
                                    {name:'userComnamne', label:'所属组织',  width: 120, sortable: false}

                                ],
                                onCellSelect : function( e, rowid, iCol, cellcontent ){
                                    if (iCol == 0 && cellcontent != null){
                                        fish.popupView({
                                            url:"components/user/views/userView",
                                            viewOption:{userAccount:cellcontent},
                                            width:"40%",
                                            callback: function (popup,view) {
                                            },
                                            close : function () {
                                                // that.searchRes();
                                            }
                                        }).then(function (view) {
                                            view.$("#saveUser").hide();
                                        });
                                    }
                                }
                            });
                        } else{
                            that.$("#UserList").append('<div style="text-align:center;">'+
                                // '<img src="marketing/css/base/images/none-1.png"'
                                +' style="height:100px;width:124px;text-align:center;margin:20px 0">'
                                +'<p style="width:100%;text-align:center;color:#d0d5e0;">抱歉！暂无数据</p></div>');
                            that.$('#user-pagination').pagination("destroy");
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
                that.$('#user-pagination').pagination("destroy");
                that.$('#user-pagination').pagination({
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
                        that.initUserGrid(eventData.page,eventData.rowNum);
                    }
                });
                that.$('#user-pagination').find(".pagination").css({"margin":"5px 0"});
                //如当前页大于总页数，则置为总页数
                if (pageInfo.pageNum > pageInfo.pages && pageInfo.pages)
                    that.initUserGrid(pageInfo.pages,pageInfo.pageSize);
            },
            // 生效/禁用
            actionBtn : function (code) {
                var that = this;
                var selRow = that.$('#UserList').grid("getSelection");
                var param = {userAccount:selRow.userAccount, userType:selRow.userType};
                param.admin = window.sessionStorage.getItem("User");
                if (param.userAccount == null ){
                    fish.error("未选中记录");
                    return false;
                }else if(window.sessionStorage.getItem("Lv") >= param.userType){
                    fish.error("权限不足");
                    return false;
                }else  if (code == 666666 ){ //重置密码
                    param.userPassword = 666666;
                }else if (code == 888888 || code == 888889){ //授权
                    if (code == 888888)  param.userType -= 1;
                    else  param.userType += 1;
                }else{
                    if (param.userState == 2 && code == 3 && code == 4) { //待审核状态下，禁用和注销
                        fish.error("请先审核!");
                        return false;
                    }
                    param.userState = code;
                }
                $.blockUI({message: '请稍后'});
                UserAction.updateUserInfo(param, function (result) {
                    $.unblockUI();
                    if(result && result.resultCode==1){
                        fish.success("操作成功");
                        that.reloadUsers();
                    }else fish.error(result.resultMsg);
                })
            }
        });
        return UserManageView;
    });