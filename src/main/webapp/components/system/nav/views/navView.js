/**
 * 主界面左侧导航nav页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/Nav.html',
        '../actions/navAction'
    ],
    function (tem, NavAction ) {
        var NavView = fish.View.extend({
            el:false,
            template:tem,
            events:{
            },
            initialize: function () {
                var that = this;
                // 修改、显示物品信息时引用此页面
                if (that.options.userAccount){
                    // that.initNav(that.options.userAccount);
                }
            },
            afterRender : function () {
                var that = this;
                that.loadPagesidebar("#sidebarTest")
            },
            loadPagesidebar : function (selector) {
                var that = this;
                var data = [
                    {
                        "title": "人员管理",
                        // "hash": "javascript:;",
                        "icon": "glyphicon glyphicon-shopping-cart",
                        "subMenus": [
                            {
                                "title": "人员列表",
                                "icon": "glyphicon glyphicon-shopping-cart",
                                // "hash": "#bb1",
                                "url": "components/user/views/userManageView"
                            }
                        ]
                    },
                    {
                        "title": "物品管理",
                        // "hash": "javascript:;",
                        "icon": "glyphicon glyphicon-asterisk",
                        "subMenus": [
                            {
                                "title": "物品管理",
                                "icon": "glyphicon glyphicon-shopping-cart",
                                // "hash": "javascript:;",
                                "url": "components/res/views/resManageView",
                                // "subMenus": [
                                //     {
                                //         "title": "三级菜单1",
                                //         "icon": "glyphicon glyphicon-shopping-cart",
                                //         // "hash": "#bbb1",
                                //         "url": "modules/user/a.html"
                                //     }
                                // ]
                            },
                            {
                                "title": "可借用物品列表",
                                "icon": "glyphicon glyphicon-shopping-cart",
                                // "hash": "#bb1",
                                "url": "components/res/views/resListView"
                            }
                        ]
                    },
                    {
                        "title": "采购管理",
                        // "hash": "#nosubmenu",
                        "url": "components/purchase/views/purchaseListView",
                        "icon": "glyphicon glyphicon-shopping-cart"
                    },
                    {
                        "title": "借用管理",
                        // "hash": "#nosubmenu",
                        "url": "components/reserve/views/reserveListView",
                        "icon": "glyphicon glyphicon-shopping-cart"
                    },
                    {
                        "title": "组织管理",
                        // "hash": "#nosubmenu",
                        // "url": "modules/user/a.html",
                        "icon": "glyphicon glyphicon-shopping-cart",
                        "subMenus":[
                            {
                                "title":"菜单管理",
                                "icon":"glyphicon glyphicon-shopping-cart",
                                "url":""
                            }
                        ]

                    },
                ];
                $(selector).pagesidebar({
                    data: data,
                    width:220,
                    openFirst: true,
                    children: "subMenus",
                    subMenuMode:"inline",
                    expand: function () {
                        console.log('expand');
                    },
                    slideUp: function () {
                        console.log('slideup');
                    },
                    slideDown: function () {
                        console.log('sllideDown');
                    },
                    select: function (e,data) {
                        data = data.originalData;
                        // $("#consolelog").html($("#consolelog").html() + "\n" + " select： " + data);
                        if(data.url != "" && data.url != undefined){
                           that.loadRight("#right-content",data.url)
                        }
                    }
                });
            },
            loadRight : function (selector,url) {
                var that = this;
                var  able = parseInt(window.sessionStorage.getItem("Able"));
                if (able == 1){
                    that.parentView.requireView({
                        selector: selector,
                        url: url,
                        // viewOption:param,
                        callback: function () {
                        }
                    });
                }else {
                    var msg = "";
                    switch (able) {
                        case -1:
                            msg = "用户待审核";
                            break;
                        case 0:
                            msg = "用户已被禁用";
                            break;
                        case -2:
                            msg = "用户审核不通过";
                            break;
                    }
                    fish.error(msg);
                }
            }

        });
        return NavView;
    });