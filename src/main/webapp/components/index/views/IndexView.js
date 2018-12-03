/**
 * 项目成员管理页面
 * requestParam:
 * 3.30 代码找回标识
 */
define(['hbs!../template/index.html'],
    function (temp) {
        var projectMemberView = fish.View.extend({
            template: temp,
            events: { },
            initialize: function () {
            },
            afterRender: function () {
            }
        });
        return projectMemberView;
    });