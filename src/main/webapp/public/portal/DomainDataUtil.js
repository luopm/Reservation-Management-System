define(function(){
    /**
     * @author huang.lixing
     * @date 2017/4/10 14:53
     * @descriprion  js 端获取主数据统一分装
     */
    var DomainDataUtil = {

        /**
         * @author huang.lixing
         * @date 2017/4/10 14:53
         * @params busiObjNbr：业务编码  propertyName： 属性名称 compontentId： 填充的主键ID或者class self： view自身对象
         * @descriprion  js 端获取主数据统一分装
         */
        comboboxValues:function(busiObjNbr,propertyName,compontentId,self,defaultValue){
            fish.post("portal/DomainDataController/getValuesList.do", {busiNbr:busiObjNbr,propertyName:propertyName},function (data) {
                if (data) {
                    if(defaultValue){

                    }else{
                        defaultValue = "";
                    }
                    self.$(compontentId).combobox({
                        dataSource: data,
                        value: defaultValue,
                        editable: false,
                        change: function (event) {
                            // var val = $('.js-man-level').combobox("value");
                        }
                    });
                }
            }.bind(this));


        },
        /**
         * @author huang.lixing
         * @date 2017/4/10 14:53
         * @params busiObjNbr：业务编码  propertyName： 属性名称
         * @descriprion  通过名称获取值
         */
        getAttrValueByName: function(busiObjNbr,propertyName,attrValueName){
            // fish.get("portal/DomainDataController/getAttrValueByName.do?busiNbr="+busiObjNbr+"&propertyName="+propertyName+"&attrValueName="+attrValueName, {},success);
            var result ;
            fish.callServiceSync("portal/DomainDataController", "getAttrValueByName",{busiNbr:busiObjNbr,propertyName:propertyName,attrValueName:attrValueName}, function (data) {
                result= data;
            });
            return result;
        },

        /**
         * @author huang.lixing
         * @date 2017/4/10 14:53
         * @params busiObjNbr：业务编码  propertyName： 属性名称
         * @descriprion  js 获取下拉列表
         */
        getAttrValues:function(busiObjNbr,propertyName){
            //fish.get("portal/DomainDataController/getValuesList.do?busiNbr="+busiObjNbr+"&propertyName="+propertyName, {},success);
            var result ;
            fish.callServiceSync("portal/DomainDataController", "getValuesList",{busiNbr:busiObjNbr,propertyName:propertyName}, function (data) {
                result= data;
            });
            return result;

        },


        /**
         * @author huang.lixing
         * @date 2017/4/10 14:53
         * @params busiObjNbr：业务编码
         * @descriprion  js 获取动态属性列表
         */
        getDanyPropertys:function(busiObjNbr){
            var result ;
            fish.callServiceSync("portal/DomainDataController", "getDanyPropertys",{busiNbr:busiObjNbr}, function (data) {
                result= data;
            });
            return result;
            // fish.get("portal/DomainDataController/getDanyPropertys.do?busiNbr="+busiObjNbr, {},success);
        },
        /**
         * @author Ma.yanbin
         * @date 2017/9/06 14:53
         * @params busiObjNbr：业务编码  propertyName： 属性名称 compontentId： 填充的主键ID或者class self： view自身对象
         * @descriprion  js 端获取主数据统一分装
         */
        systemInfoIdComboboxValues:function(compontentId,self,defaultValue){
            fish.get("orgauth/SystemInfoController/getSystemInfoList.do",function (systemInfoList) {
                //name ,value 模式
                var data=[];
                if (systemInfoList) {

                    $.each(systemInfoList,function (index,systemInfo) {
                        var system = {};
                        system.name = systemInfo.systemName;
                        system.value = systemInfo.systemInfoId;
                        data.push(system);
                    })

                    if(defaultValue){

                    }else{
                        defaultValue = "";
                    }
                    self.$(compontentId).combobox({
                        dataSource: data,
                        value: defaultValue,
                        editable: false,
                        change: function (event) {
                            // var val = $('.js-man-level').combobox("value");
                        }
                    });
                }
            }.bind(this));
        }
    }


    return DomainDataUtil;
});