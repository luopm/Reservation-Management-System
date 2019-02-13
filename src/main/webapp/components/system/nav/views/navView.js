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
                var data = [
                    {
                        "title": "一级菜单1",
                        // "hash": "javascript:;",
                        "icon": "glyphicon glyphicon-shopping-cart",
                        "subMenus": [
                            {
                                "title": "二级菜单1",
                                "icon": "glyphicon glyphicon-shopping-cart",
                                // "hash": "#bb1",
                                "url": "modules/user/a.html"
                            }
                        ]
                    },
                    {
                        "title": "一级菜单2",
                        "hash": "javascript:;",
                        "icon": "glyphicon glyphicon-asterisk",
                        "subMenus": [
                            {
                                "title": "二级菜单1",
                                "icon": "glyphicon glyphicon-shopping-cart",
                                "hash": "javascript:;",
                                "url": "modules/user/a.html",
                                "subMenus": [
                                    {
                                        "title": "三级菜单1",
                                        "icon": "glyphicon glyphicon-shopping-cart",
                                        "hash": "#bbb1",
                                        "url": "modules/user/a.html"
                                    },
                                    {
                                        "title": "三级菜单2",
                                        "icon": "glyphicon glyphicon-shopping-cart",
                                        "hash": "#bbb2",
                                        "url": "modules/user/a.html"
                                    },
                                    {
                                        "title": "三级菜单3",
                                        "icon": "glyphicon glyphicon-shopping-cart",
                                        "hash": "#bbb3",
                                        "url": "modules/user/a.html"
                                    },
                                    {
                                        "title": "三级菜单4",
                                        "icon": "glyphicon glyphicon-shopping-cart",
                                        "hash": "#bbb4",
                                        "url": "modules/user/a.html"
                                    },
                                    {
                                        "title": "三级菜单5",
                                        "icon": "glyphicon glyphicon-shopping-cart",
                                        "hash": "#bbb5",
                                        "url": "modules/user/a.html"
                                    },
                                    {
                                        "title": "三级菜单6",
                                        "icon": "glyphicon glyphicon-shopping-cart",
                                        "hash": "#bbb6",
                                        "url": "modules/user/a.html"
                                    },
                                    {
                                        "title": "三级菜单7",
                                        "icon": "glyphicon glyphicon-shopping-cart",
                                        "hash": "#bbb7",
                                        "url": "modules/user/a.html"
                                    },
                                    {
                                        "title": "三级菜单8",
                                        "icon": "glyphicon glyphicon-shopping-cart",
                                        "hash": "#bbb8",
                                        "url": "modules/user/a.html"
                                    },
                                    {
                                        "title": "三级菜单9",
                                        "icon": "glyphicon glyphicon-shopping-cart",
                                        "hash": "#bbb9",
                                        "url": "modules/user/a.html"
                                    },
                                    {
                                        "title": "三级菜单10",
                                        "icon": "glyphicon glyphicon-shopping-cart",
                                        "hash": "#bbb10",
                                        "url": "modules/user/a.html"
                                    }
                                ]
                            },
                            {
                                "title": "二级菜单2",
                                "icon": "glyphicon glyphicon-shopping-cart",
                                "hash": "#cc2",
                                "url": "modules/user/a.html"
                            }
                        ]
                    },
                    {
                        "title": "无子菜单",
                        "hash": "#nosubmenu",
                        "url": "modules/user/a.html",
                        "icon": "glyphicon glyphicon-shopping-cart"
                    },
                ];

                $('#sidebarTest').pagesidebar({
                    data: data,
                    width:290,
                    // openFirst: true,
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
                        // $("#consolelog").html($("#consolelog").html() + "\n" + " select： " + data);
                    }
                });
            }

        });
        return NavView;
    });