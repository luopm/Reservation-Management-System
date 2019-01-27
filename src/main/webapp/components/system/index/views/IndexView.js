/**
 * 项目Index页面
 * requestParam:
 * 1.0 代码找回标识
 */
define([
        // 'public/portal/portal'
    ],
    function () {
        var IndexView = fish.View.extend({
            initialize: function () {
                //监听登录状态改变
                // portal.appGlobal.on("change:currentStatus", this.currentStatusChange, this);
                this.requireView('components/system/login/views/LoginView');
            },

            // 如果已经登录了，则修改成main IndexView，否则变成LoginView
            currentStatusChange: function () { //登录状态改变
                if ("login" == portal.appGlobal.get("currentStatus")) {
                    this.requireView('components/login/views/LoginView');
                } else if ("running" == portal.appGlobal.get("currentStatus")) {
                    this.requireView('components/main/views/MainView');
                } else if ("sessionTimeOut" == portal.appGlobal.get("currentStatus")) {
                    // fish.store.set("reLogin", i18n.SESSION_TIME_OUT_REASON);
                    this.requireView('components/login/views/LoginView');
                } else if ("beenKickedFromLogin" == portal.appGlobal.get("currentStatus")) {
                    // fish.store.set("reLogin", i18n.SESSION_TIME_OUT_BEEN_KICKED);
                    this.requireView('components/login/views/LoginView');
                }
            },
        });
        return IndexView;
    });