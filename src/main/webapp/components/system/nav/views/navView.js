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
                    that.initNav(that.options.userAccount);
                }
            },
            // 获取物品信息
            initNav : function (param) {
                var that = this;
                NavAction.getNavInfo(param, function (result) {
                    if (result && result.resultCode == 0) {
                        var options = {
                            fNodes: fNodes,
                            view: {
                                formatter: function (node) {
                                    var len = node.name.split(''),
                                        str = node.name;
                                    if (len.length > 15) {
                                        str =  node.name.slice(0, 14) + '...';
                                    }
                                    return str;
                                }
                            },
                            callback: {
                                beforeClick: function (e, treeNode, clickFlag) {
                                    console.log("[beforeClick ] " + treeNode.name);
                                },
                                onClick: function (e, treeNode, clickFlag) {
                                    console.log(treeNode);
                                    console.log("[onClick ] clickFlag = " + clickFlag + " (" + (clickFlag === 1 ? "普通选中" : (clickFlag === 0 ? "<b>取消选中</b>" : "<b>追加选中</b>")) + ")");
                                },
                                onNodeCreated: function (e, treeNode) {
                                    var id = this.id;
                                    console.log("[onNodeCreated] " + id + " " + treeNode.name);
                                },
                                beforeDblClick: function (e, treeNode) {
                                    console.log("[beforeDblClick] " + treeNode.name);
                                },
                                onDblClick: function (e, treeNode) {
                                    console.log("[onDblClick] " + treeNode.name);
                                },
                                beforeMouseDown: function (e, treeNode) {
                                    console.log("[beforeMouseDown] " + treeNode.name);
                                },
                                onMouseDown: function (e, treeNode) {
                                    console.log("[onMouseDown] " + treeNode.name);
                                },
                                beforeMouseUp: function (e, treeNode) {
                                    console.log("[beforeMouseUp] " + treeNode.name);
                                },
                                onMouseUp: function (e, treeNode) {
                                    console.log("[onMouseUp] " + treeNode.name);
                                },
                                beforeRightClick: function (e, treeNode) {
                                    console.log("[beforeRightClick] " + treeNode.name);
                                },
                                onRightClick: function (e, treeNode) {
                                    console.log("[onRightClick] " + treeNode.name);
                                },
                                beforeCollapse: function (e, treeNode) {
                                    console.log("[beforeCollapse] " + treeNode.name);
                                },
                                beforeExpand: function (e, treeNode) {
                                    console.log("[beforeExpand] " + treeNode.name);
                                },
                                beforeSelect: function (e, treeNode, addFlag) {
                                    console.log("[beforeSelect] " + treeNode.name + ' addFlag: ' + addFlag);
                                },
                                onSelect: function (e, treeNode, addFlag) {
                                    console.log("[onSelect] " + treeNode.name + ' addFlag: ' + addFlag);
                                },
                            },
                        };
                        that.$("#nav").tree(options);
                    }
                })
            }
        });
        return NavView;
    });