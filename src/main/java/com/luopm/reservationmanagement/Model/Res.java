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

    private String resState;

    private Integer resTypecode;

    private String resType;

    private Integer resBorrowable;

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

    public String getResState() {
        return resState;
    }

    public void setResState(String resState) {
        this.resState = resState == null ? null : resState.trim();
    }

    public Integer getResTypecode() {
        return resTypecode;
    }

    public void setResTypecode(Integer resTypecode) {
        this.resTypecode = resTypecode;
    }

    public String getResType() {
        return resType;
    }

    public void setResType(String resType) {
        this.resType = resType == null ? null : resType.trim();
    }

    public Integer getResBorrowable() {
        return resBorrowable;
    }

    public void setResBorrowable(Integer resBorrowable) {
        this.resBorrowable = resBorrowable;
    }
}