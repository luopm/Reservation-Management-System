package com.luopm.reservationmanagement.Model;

public class ResponseUtil {
    int resultCode;
    String resultMsg;
    Object resultObject;
    Object resultOtherObj;

    public ResponseUtil(){
        this.setResultCode(-1);
        this.setResultMsg("操作失败");
        this.setResultObject(null);
        this.setResultOtherObj(null);
    }

    public ResponseUtil(int resultCode, String resultMsg, Object resultObject, Object resultOtherObj){
        this.setResultCode(resultCode);
        this.setResultMsg(resultMsg);
        this.setResultObject(resultObject);
        this.setResultOtherObj(resultOtherObj);
    }

    public int getResultCode() {
        return resultCode;
    }

    public String getResultMsg() {
        return resultMsg;
    }

    public Object getResultObject() {
        return resultObject;
    }

    public Object getResultOtherObj() {
        return resultOtherObj;
    }

    public void setResultCode(int resultCode) {
        this.resultCode = resultCode;
    }

    public void setResultMsg(String resultMsg) {
        this.resultMsg = resultMsg;
    }

    public void setResultObject(Object resultObject) {
        this.resultObject = resultObject;
    }

    public void setResultOtherObj(Object resultOtherObj) {
        this.resultOtherObj = resultOtherObj;
    }

    public void setResponseUtil(int resultCode, String resultMsg, Object resultObject, Object resultOtherObj){
        this.setResultCode(resultCode);
        this.setResultMsg(resultMsg);
        this.setResultObject(resultObject);
        this.setResultOtherObj(resultOtherObj);
//        return this;
    }
}