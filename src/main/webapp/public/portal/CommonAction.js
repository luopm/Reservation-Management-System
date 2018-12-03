define(['i18n!language/public/public','language/public/resultMsgTool'],function (pub,resultMsgTool) {
    //CommonAction提供一些公用的，但是又不适合作为框架组成部分的方法
    //警告：这不是fish框架的内容，为一种自行实现，所有内容可以按照实际业务场景修改
    return {
        Code: {
            SUCCESS: "0000" //成功
        },//编码对象
        codeData: {},//这个对象用来缓存静态编码数据，如果乐意的话可以加入采用H5本地缓存
        //request方法
        //该方法承载具体业务环境的AJAX调用逻辑，传参形式及回调函数方式自行根据具体系统后端框架实现
        callService: function (classname, method, param, succ, errc) {
            //本处示例的实现设计：
            //CommonAction.request(类名，方法名，参数对象，成功传参回调函数)
            //CommonAction.request("Class","method",{param:1},function(reply){});
            //亦可为request("localhost:8080/xxx",{},function(reply){});这种快速url调用
            if (!param) {
                param = {};
            }

            var qryurl = portal.appGlobal.attributes.webroot + "/" + classname + "/" + method+".do";
            if (portal.localajax) {
                qryurl = portal.appGlobal.attributes.webroot + '/modules/data/' + classname + '/' + method + '.json'
            }

            if (_.isObject(method)) {
                //参数调整，如果method是对象，则说明省略了method参数（method应该是字符串）
                //在这种情况下，classname即是url
                qryurl = classname;
                if (_.isFunction(param)) {
                    succ = param
                }
                param = method;
            }

            return fish.ajax({
                url: qryurl,//请求地址，具体内容参见CommonServlet.java与web.xml
                type: 'POST',//可以是POST或者GET，与jQuery原生的封装一致
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                data: JSON.stringify(param),//需要传递的参数 param.toJSONString()
                success: function (reply) {
                    if (reply && reply.res_code == "needsession") {
                        //无SESSION判断
                        //如果接收到res_code为needsession，代表这次请求的方法是需要登录以后（具备session）才能访问的
                        //直接进行报错提示，并且返回登录页面
                        fish.info(pub.loginwarn, function () {
                            window.location.href = "login.html";
                        });
                    } else {
                        if (succ) {
                            //如果定义了回调函数，则正常调用成功的回调函数
                            succ(reply);
                        }
                    }
                }
                //本处只提供了成功时的回调函数，默认的error回调函数由FISH框架提供
                //如果自己覆盖了error回调函数，则FISH不会使用默认的弹窗形式表示错误，需要自行实现
            });
        },
        //同步型方法
        callServiceSync: function (classname, method, param, succ) {
            if (!param) {
                param = {};
            }

            var qryurl = portal.appGlobal.attributes.webroot + "/" + classname + "/" + method+".do";
            if (portal.localajax) {
                qryurl = portal.appGlobal.attributes.webroot + '/modules/data/' + classname + '/' + method + '.json'
            }

            if (_.isObject(method)) {
                //参数调整，如果method是对象，则说明省略了method参数（method应该是字符串）
                //在这种情况下，classname即是url
                qryurl = classname;
                if (_.isFunction(param)) {
                    succ = param
                }
                param = method;
            }

            return fish.ajax({
                url: qryurl,//请求地址，具体内容参见CommonServlet.java与web.xml
                method: 'POST',//可以是POST或者GET，与jQuery原生的封装一致
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                data: JSON.stringify(param),//需要传递的参数
                async: false,//这个是同步方法
                success: function (reply) {
                    if (reply && reply.res_code == "needsession") {
                        fish.info(pub.loginwarn, function () {
                            window.location.href = "login.html";
                        });
                    } else {
                        if (succ) {
                            succ(reply);
                        }
                    }
                }
                //本处只提供了成功时的回调函数，默认的error回调函数由FISH框架提供
                //如果自己覆盖了error回调函数，则FISH不会使用默认的弹窗形式表示错误，需要自行实现
            });
        },
        //暂时的静态数据翻译方案
        //这是一个用于grid控件的formatter的生成函数，在这个函数里进行具体的翻译方法的实现，然后在需要指定CODE的数据表格里调用这个函数即可
        //例：{name:"state",
        //formatter:CommonAction.decode("ORDERSTATE")
        //}
        decode: function (code) {
            var that = this;
            return function (cellval, opts, rowdata, _act) {
                if (!that.codeData[code]) {//如果在缓存对象里没有，则去后端获取
                    that.requestSync("SystemController", "getDcParam", {code: code}, function (reply) {
                        if (reply) {
                            that.codeData[code] = reply;
                        }
                    });
                }
                //返回编码里相匹配的值，如果编码里没有匹配的值那么直接返回原始数据
                return that.codeData[code][cellval] ? that.codeData[code][cellval] : cellval;
            }
        },
        getCode: function (code) {
            //获取指定CODE对应的静态数据对象
            var that = this;
            return function (cellval, opts, rowdata, _act) {
                if (!that.codeData[code]) {//如果在缓存对象里没有，则去后端获取
                    that.requestSync("SystemController", "getDcParam", {code: code}, function (reply) {
                        if (reply) {
                            that.codeData[code] = reply;
                        }
                    });
                }
                return that.codeData[code];
            }
        },
        comboboxCode: function (code) {
            // 用于combobox的静态数据加载方法
            //用例：$(".combo").combobox({
            //		dataSource:CommonAction.comboboxCode('ORDERSTATE')
            //	});
            var that = this;
            if (!that.codeData[code]) {//如果在缓存对象里没有，则去后端获取
                that.requestSync("SystemController", "getDcParam", {code: code}, function (reply) {
                    if (reply) {
                        that.codeData[code] = reply;
                    }
                });
            }
            var keys = _.keys(that.codeData[code]);
            var result = [];
            for (var i = 0; i < keys.length; i++) {
                result.push({name: that.codeData[code][keys[i]], value: keys[i]});
            }

            return result;
        },

        getFormQueryObject: function (frmID,trimPrex) {
            //用户FROM表单ID转换成为对象用
            // trimPrex 用户ID唯一性保证的前缀替换，返回的对象是去掉前缀的
            var frmID=document.getElementById(frmID);
            var i;
            var item; // for each form's object
            var itemValue;// store each form object's value

            var param={};
            for( i=0;i<frmID.length;i++ ){
                item = frmID[i];// get form's each object
                if( "id" in item ){
                    if( item.type == 'select-one' ){
                        itemValue = item.options[item.selectedIndex].value;

                    }else if( item.type=='checkbox' || item.type=='radio') {

                        if ( item.checked == false ){
                            continue;
                        }
                        itemValue = item.value;
                    } else if( item.type == 'button' || item.type == 'submit' || item.type == 'reset' || item.type == 'image'){// ignore this type
                        continue;
                    }else{
                        itemValue = item.value;
                    }
                    itemValue = encodeURIComponent(itemValue);
                    var attrId =item.id.replace(trimPrex,"");

                    if(item.type=='radio'){
                        var attrId = attrId.replace("_radioChar","");
                    }

                    param[attrId]=item.value;

                }
            }
            return param;
        },


        /**
         * 初始化table信息
         * @param frmID
         * @param trimPrex
         * @param paramObj
         */
        initFormByObject : function (frmID,trimPrex, paramObj) {
            //对象转换 用户FROM表单
            var frmID=document.getElementById(frmID);
            //$(frmID).form('clear');
            var i;
            var item; // for each form's object

            for( i=0;i<frmID.length;i++ ){
                item = frmID[i];// get form's each object
                if( "id" in item ){
                    var attrId =item.id.replace(trimPrex,"");

                    if(item.type=='radio'){
                        var attrId =  attrId.replace("_radioChar","");
                    }

                    if(!(attrId in paramObj))
                        continue;

                    if( item.type == 'select-one' ){

                            var j;
                            for(j=0;j<item.options.length;j++){
                                if(item.options[j].value==paramObj[attrId]){
                                    item.selectedIndex = item.options[j].index;
                                }
                            }

                       // item.options[item.selectedIndex].value =paramObj[attrId];

                    }else if( item.type=='checkbox' || item.type=='radio') {

                        if ( item.value == paramObj[attrId] ){
                            item.checked=true;
                        }
                    }else if( item.type == 'button' || item.type == 'submit' || item.type == 'reset' || item.type == 'image'){// ignore this type
                        continue;
                    }else{
                        item.value = paramObj[attrId];
                    }

                }
            }

        },


        dateTsFormatter: function(ts) {

            if(ts==null || ts==''){
                return '';
            }

            var date=new Date(ts);
            return fish.dateutil.format(date,"yyyy-mm-dd hh:ii:ss");
        },

        postWithBlock:function (url,submitParam,successFunc) {  //后台提交封装;
            $.blockUI({message: pub.submitting});
            fish.post(url, submitParam, function (result) {
                $.unblockUI();
                if(result.resultCode==0){
                    successFunc(result.resultObject);
                }else{
                    var resultMsg = resultMsgTool.toInternational(result.resultMsg,pub);
                    fish.error(resultMsg);
                }

            });
        },
        
        postWithoutBlock:function (url,submitParam,successFunc) {
            fish.post(url, submitParam, function (result) {
                if(result.resultCode==0){
                    successFunc(result.resultObject);
                }else{
                    var resultMsg = resultMsgTool.toInternational(result.resultMsg,pub);
                    fish.error(resultMsg);
                }

            });
            
        },

        deepCopy:function (obj) {
            var res = {}
            for (var key in obj) {
                res[key] = obj[key]
            }
            return res
        },

        isAdmin:function () {  //是否超管
            var loginInfo = portal.appGlobal.get('loginInfo');
            var isAdmin = loginInfo.superAdminFlag;
            return isAdmin==true?true:false;
        }

    }
});

