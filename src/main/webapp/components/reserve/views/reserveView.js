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
            saveReserve : function () {
                var that = this;
                var param = that.$('#reserveFormInfo').form();
                if (param.BorResName == undefined && param.BorResCode == undefined &&
                    param.BorUserAccount == undefined && param.BorStartDate == undefined &&
                    param.BorEndDate == undefined ) {
                    fish.info("请完整填写信息！");
                    return ;
                }
                $.blockUI({message:"请稍后"})
                reserveAction.reserve(param, function (result) {
                    $.unblockUI();
                    if (result & result.resultCode == 0){
                        fish.success("预约成功！");
                    }else{
                        fish.error(result.resultMsg);
                    }
                })
            }
        });
        return ReserveView;
    });