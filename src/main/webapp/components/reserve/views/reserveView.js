/**
 * 预约页面
 * requestParam:
 * 1.0 代码找回标识
 */
define(['hbs!../template/reserve.html',
        '../actions/reserveAction'
    ],
    function (tem, reserveAction) {
        var ReserveView = fish.View.extend({
            el:false,
            template:tem,
            events:{
                'click #saveReserve':'saveReserve'
            },
            initialize: function () {
            },
            afterRender : function () {
                var that = this;
                if (that.options.reserve != undefined){ //新增:初始化用户和物品信息
                    that.$('#reserveFormInfo').form().form("value",that.options.reserve);
                }else if (that.options.borCode != undefined){ //查看详情:初始化预约信息
                    that.getReserveInfo(that.options.borCode);
                }
                that.$("#borStartdate").datetimepicker({
                    buttonIcon: ''
                });
                that.$("#borEnddate").datetimepicker({
                    buttonIcon: ''
                });
            },
            getReserveInfo : function (borCode) {
                var that = this;
                var param = {borCode:borCode};
                reserveAction.getReserve(param, function (result) {
                    if (result.resultCode == 1){
                        that.$('#reserveFormInfo').form().form("value",result.resultObject);
                    }else fish.error(result.resultMsg);
                })
            },
            saveReserve : function () {
                var that = this;
                var param = that.$('#reserveFormInfo').form().form("value");
                if (param.borResname != null && param.borRescode != null && param.borUseraccount != null &&
                    param.borReason != null && param.borEnddate != null ) {
                    param.borState = "待审核";
                    param.borEnddate = new Date(param.borEnddate);
                    param.borStartdate = new Date();
                    $.blockUI({message:"请稍后"})
                    reserveAction.reserve(param, function (result) {
                        $.unblockUI();
                        if (result && result.resultCode == 1){
                            fish.success("预约成功！");
                            that.popup.close();
                        }else{
                            fish.error(result.resultMsg);
                        }
                    });
                }else{
                    fish.info("请完整填写信息！");
                    return ;
                }

            }
        });
        return ReserveView;
    });