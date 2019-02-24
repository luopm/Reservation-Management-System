package com.luopm.reservationmanagement.Model;


import com.alibaba.fastjson.annotation.JSONField;

import java.math.BigDecimal;
import java.util.Date;

public class Res {
    private Integer resId;

    private String resCode;

    private String resName;

    private String resStandard;

    private BigDecimal resPrice;

    private String resLocation;

    private String resCustodian;

    private String resCustodiancode;

    private Date resEnabledate;

    private Date resScrapdate;

    private Integer resState;

    private Integer resClass;

    private Integer resType;

    private String resComcode;

    private String resComname;

    public Integer getResId() {
        return resId;
    }

    public void setResId(Integer resId) {
        this.resId = resId;
    }

    public String getResCode() {
        return resCode;
    }

    public void setResCode(String resCode) {
        this.resCode = resCode == null ? null : resCode.trim();
    }

    public String getResName() {
        return resName;
    }

    public void setResName(String resName) {
        this.resName = resName == null ? null : resName.trim();
    }

    public String getResStandard() {
        return resStandard;
    }

    public void setResStandard(String resStandard) {
        this.resStandard = resStandard == null ? null : resStandard.trim();
    }

    public BigDecimal getResPrice() {
        return resPrice;
    }

    public void setResPrice(BigDecimal resPrice) {
        this.resPrice = resPrice;
    }

    public String getResLocation() {
        return resLocation;
    }

    public void setResLocation(String resLocation) {
        this.resLocation = resLocation == null ? null : resLocation.trim();
    }

    public String getResCustodian() {
        return resCustodian;
    }

    public void setResCustodian(String resCustodian) {
        this.resCustodian = resCustodian == null ? null : resCustodian.trim();
    }

    public String getResCustodiancode() {
        return resCustodiancode;
    }

    public void setResCustodiancode(String resCustodiancode) {
        this.resCustodiancode = resCustodiancode == null ? null : resCustodiancode.trim();
    }

    public Date getResEnabledate() {
        return resEnabledate;
    }

    public void setResEnabledate(Date resEnabledate) {
        this.resEnabledate = resEnabledate;
    }

    public Date getResScrapdate() {
        return resScrapdate;
    }

    public void setResScrapdate(Date resScrapdate) {
        this.resScrapdate = resScrapdate;
    }

    public Integer getResState() {
        return resState;
    }

    public void setResState(Integer resState) {
        this.resState = resState;
    }

    public Integer getResClass() {
        return resClass;
    }

    public void setResClass(Integer resClass) {
        this.resClass = resClass;
    }

    public Integer getResType() {
        return resType;
    }

    public void setResType(Integer resType) {
        this.resType = resType;
    }

    public String getResComcode(){return resComcode;}

    public void  setResComcode(String resComcode){this.resComcode = resComcode == null ? null : resComcode.trim();}

    public String getResComname(){return resComname;}

    public void setResComname(String resComname){this.resComname = resComname == null ? null : resComname.trim();}
}