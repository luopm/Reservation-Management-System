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
                if (that.options.reserve != undefined){ //初始化用户和物品信息
                    that.$('#reserveFormInfo').form().form("value",that.options.reserve);
                };
                that.$("#borStartdate").datetimepicker({
                    buttonIcon: ''
                });
                that.$("#borEnddate").datetimepicker({
                    buttonIcon: ''
                });
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