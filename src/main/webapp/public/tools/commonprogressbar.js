// 页面中的进度条逻辑。
define(['i18n!language/public/public','language/public/resultMsgTool'], function (pub,resultMsgTool) {

    var commonProgressBar = {
        fishView: null,

        // 传入一个jq对象, 这个jq对象一般是一个包含进度条的页面的div元素
        init: function (fishView) {
            this.fishView = fishView;

            if (!fishView) {
                throw new Exception(pub.newprogressbartip);
            }
        },

        // 将jq选择器progressbarSelector所指定的jq对象初始化为进度条, 同时将其隐藏
        initOneProgressbar: function (progressbarSelector) {
            var view = this.fishView;

            var pointsArr = ['.', '..', '...'];
            var pointsArrLen = pointsArr.length;

            var currentPointVal = 0;

            view.$(progressbarSelector).data('changeLabelWhileProgressing', function () {
                currentPointVal ++;
                view.$(progressbarSelector).progressbar('label', pub.inoperation+pointsArr[currentPointVal%pointsArrLen]);
            });

            view.$(progressbarSelector).progressbar({
                value: 0,
                create: function (e, ui) {
                    ui.progressbar.progressbar('label', pub.inoperation);
                },

                change: function (e, ui) {
                    // ui.progressbar.data('changeLabelWhileProgressing')();
                },

                complete: function (e, ui) {
                    if (view.$(progressbarSelector).data('success')) {
                        $(progressbarSelector + ' .ui-progressbar-value').css("background-color", "#13ce66");
                        ui.progressbar.progressbar('label', pub.actsucc);
                    } else {
                        $(progressbarSelector + ' .ui-progressbar-value').css("background-color", "red");
                        ui.progressbar.progressbar('label', pub.actfail);
                    }
                    currentPointVal = 0;
                },
            }).hide();
        },

        // options是一个json对象，其中：
        // selector： 进度条的jq选择器
        // url：咨询状态的动作的url
        // params： url的参数
        // actionText： 表示操作的文字信息，如“新增”、“修改”、“删除”
        // preFunc： 使用进度条之前要执行的函数
        // sufFunc： 使用完进度条后要执行的函数
        // successFunc： 咨询状态得到“成功”信息后要执行的函数
        // failFunc： 咨询状态得到“失败”信息后要执行的函数
        useProgressbarCommonFunc: function (options) {
            var that = this;

            that.fishView.$(options.selector).show();
            (typeof options.preFunc == "function") ? options.preFunc() : undefined;

            var progressbarFunc = $().progressbar.bind($(options.selector));

            that.fishView.$(options.selector).progressbar('value', 0);

            // 循环请求状态
            var circularlyQryFunc = function () {
                fish.post(options.url, options.params, function (result) {
                    switch (result.resultCode) {
                        case '0': // 进行中
                            var currentVal = progressbarFunc('value');
                            if (currentVal < 99) {
                                progressbarFunc('value', currentVal+1);
                            }
                            setTimeout (function () {
                                that.fishView.$(options.selector).data('changeLabelWhileProgressing')();
                                circularlyQryFunc();
                            }, 200);
                        break;

                        case '1': // 结束
                            that.fishView.$(options.selector).data('success', true);
                            progressbarFunc('value', 100);
                            var resultMsg = resultMsgTool.toInternational(result.resultMsg,pub);
                            fish.success(pub.actsucc,function(){
                                (typeof options.sufFunc == "function") ? options.sufFunc() : undefined;
                                (typeof options.successFunc == "function") ? options.successFunc(result) : undefined;
                                that.fishView.$(options.selector).hide();
                            });

                           /*chenxm 注释 fish.success(options.actionText + "成功");
                            fish.success(result.resultMsg);
                            (typeof options.sufFunc == "function") ? options.sufFunc() : undefined;
                            (typeof options.successFunc == "function") ? options.successFunc(result) : undefined;
                            setTimeout(function () {
                                that.fishView.$(options.selector).hide();
                            }, 2000);*/
                        break;

                        case '2': // 失败
                            that.fishView.$(options.selector).data('success', false);
                            progressbarFunc('value', 100);
                            var resultMsg = resultMsgTool.toInternational(result.resultMsg,pub);
                            fish.error(resultMsg,function(){
                                (typeof options.sufFunc == "function") ? options.sufFunc() : undefined;
                                (typeof options.failFunc == "function") ? options.failFunc(result) : undefined;
                                that.fishView.$(options.selector).hide();
                                $(options.selector + ' .ui-progressbar-value').css("background-color", "#13ce66");
                            });

                           /* (typeof options.sufFunc == "function") ? options.sufFunc() : undefined;
                            (typeof options.failFunc == "function") ? options.failFunc(result) : undefined;

                            setTimeout(function () {
                                that.fishView.$(options.selector).hide();
                                $(options.selector + ' .ui-progressbar-value').css("background-color", "#13ce66");
                            }, 2000);*/
                        break;
                    }
                });
            };

            circularlyQryFunc();

        },

    }

    return commonProgressBar;
    
})
