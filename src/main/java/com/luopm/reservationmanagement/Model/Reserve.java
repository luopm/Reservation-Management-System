package com.luopm.reservationmanagement.Model;

import java.util.Date;

public class Reserve {
    private Integer borId;

    private String borCode;

    private String borRescode;

    private String borResname;

    private String borUseraccount;

    private String borUsername;

    private Date borStartdate;

    private Date borEnddate;

    private Date borReturndate;

    private String borState;

    private String borAdmincode;

    private String borAdminname;

    private String borReason;

    public Integer getBorId() {
        return borId;
    }

    public void setBorId(Integer borId) {
        this.borId = borId;
    }

    public String getBorCode() {
        return borCode;
    }

    public void setBorCode(String borCode) {
        this.borCode = borCode == null ? null : borCode.trim();
    }

    public String getBorRescode() {
        return borRescode;
    }

    public void setBorRescode(String borRescode) {
        this.borRescode = borRescode == null ? null : borRescode.trim();
    }

    public String getBorResname() {
        return borResname;
    }

    public void setBorResname(String borResname) {
        this.borResname = borResname == null ? null : borResname.trim();
    }

    public String getBorUseraccount() {
        return borUseraccount;
    }

    public void setBorUseraccount(String borUseraccount) {
        this.borUseraccount = borUseraccount == null ? null : borUseraccount.trim();
    }

    public String getBorUsername() {
        return borUsername;
    }

    public void setBorUsername(String borUsername) {
        this.borUsername = borUsername == null ? null : borUsername.trim();
    }

    public Date getBorStartdate() {
        return borStartdate;
    }

    public void setBorStartdate(Date borStartdate) {
        this.borStartdate = borStartdate;
    }

    public Date getBorEnddate() {
        return borEnddate;
    }

    public void setBorEnddate(Date borEnddate) {
        this.borEnddate = borEnddate;
    }

    public Date getBorReturndate() {
        return borReturndate;
    }

    public void setBorReturndate(Date borReturndate) {
        this.borReturndate = borReturndate;
    }

    public String getBorState() {
        return borState;
    }

    public void setBorState(String borState) {
        this.borState = borState == null ? null : borState.trim();
    }

    public String getBorAdmincode() {
        return borAdmincode;
    }

    public void setBorAdmincode(String borAdmincode) {
        this.borAdmincode = borAdmincode == null ? null : borAdmincode.trim();
    }

    public String getBorAdminname() {
        return borAdminname;
    }

    public void setBorAdminname(String borAdminname) {
        this.borAdminname = borAdminname == null ? null : borAdminname.trim();
    }

    public String getBorReason() {
        return borReason;
    }

    public void setBorReason(String borReason) {
        this.borReason = borReason == null ? null : borReason.trim();
    }
}