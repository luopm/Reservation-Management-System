/**
 * 主界面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/Home.html',
        // './homeView',
        '../actions/navAction'
    ],
    function (tem ) {
        var HomeView = fish.View.extend({
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
            afterRender : function () {
                var that = this;
                that.$("#horizontal").splitter({//这个控制的是主面板（上下垂直分为两段）
                    panes: [
                        { collapsible: true ,//可以收缩
                            resizable: false, //不能调整大小
                            size: "22%"},//初始尺寸，是垂直布局的情况下就是高度，水平布局就是宽度
                        { collapsible: false  }//设置第二个面板不允许收缩
                    ]
                });
                that.requireView({
                    selector: "#left-pane",
                    url: 'components/system/nav/views/navView',
                    // viewOption:param,
                    callback: function () {
                    }
                });

            },
        });
        return HomeView;
    });