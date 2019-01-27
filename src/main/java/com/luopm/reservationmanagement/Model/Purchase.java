package com.luopm.reservationmanagement.Model;

import java.math.BigDecimal;
import java.util.Date;

public class Purchase {
    private Integer buyId;

    private String buyCode;

    private String buyResname;

    private String buyResstandard;

    private BigDecimal buyResprice;

    private String buyWay;

    private String buyAdmincode;

    private String buyAdminname;

    private String buyState;

    private Date buyDate;

    private Date buyApplydate;

    private String buyReason;

    public Integer getBuyId() {
        return buyId;
    }

    public void setBuyId(Integer buyId) {
        this.buyId = buyId;
    }

    public String getBuyCode() {
        return buyCode;
    }

    public void setBuyCode(String buyCode) {
        this.buyCode = buyCode == null ? null : buyCode.trim();
    }

    public String getBuyResname() {
        return buyResname;
    }

    public void setBuyResname(String buyResname) {
        this.buyResname = buyResname == null ? null : buyResname.trim();
    }

    public String getBuyResstandard() {
        return buyResstandard;
    }

    public void setBuyResstandard(String buyResstandard) {
        this.buyResstandard = buyResstandard == null ? null : buyResstandard.trim();
    }

    public BigDecimal getBuyResprice() {
        return buyResprice;
    }

    public void setBuyResprice(BigDecimal buyResprice) {
        this.buyResprice = buyResprice;
    }

    public String getBuyWay() {
        return buyWay;
    }

    public void setBuyWay(String buyWay) {
        this.buyWay = buyWay == null ? null : buyWay.trim();
    }

    public String getBuyAdmincode() {
        return buyAdmincode;
    }

    public void setBuyAdmincode(String buyAdmincode) {
        this.buyAdmincode = buyAdmincode == null ? null : buyAdmincode.trim();
    }

    public String getBuyAdminname() {
        return buyAdminname;
    }

    public void setBuyAdminname(String buyAdminname) {
        this.buyAdminname = buyAdminname == null ? null : buyAdminname.trim();
    }

    public String getBuyState() {
        return buyState;
    }

    public void setBuyState(String buyState) {
        this.buyState = buyState == null ? null : buyState.trim();
    }

    public Date getBuyDate() {
        return buyDate;
    }

    public void setBuyDate(Date buyDate) {
        this.buyDate = buyDate;
    }

    public Date getBuyApplydate() {
        return buyApplydate;
    }

    public void setBuyApplydate(Date buyApplydate) {
        this.buyApplydate = buyApplydate;
    }

    public String getBuyReason() {
        return buyReason;
    }

    public void setBuyReason(String buyReason) {
        this.buyReason = buyReason == null ? null : buyReason.trim();
    }
}