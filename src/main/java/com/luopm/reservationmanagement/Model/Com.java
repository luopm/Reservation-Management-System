package com.luopm.reservationmanagement.Model;

import java.util.Date;

public class Com {
    private Integer id;

    private String comCode;

    private String comName;

    private Integer comType;

    private Date comCreateddate;

    private String comAccount;

    private Integer comTel;

    private String comEmail;

    private Integer comState;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getComCode() {
        return comCode;
    }

    public void setComCode(String comCode) {
        this.comCode = comCode == null ? null : comCode.trim();
    }

    public String getComName() {
        return comName;
    }

    public void setComName(String comName) {
        this.comName = comName == null ? null : comName.trim();
    }

    public Integer getComType() {
        return comType;
    }

    public void setComType(Integer comType) {
        this.comType = comType;
    }

    public Date getComCreateddate() {
        return comCreateddate;
    }

    public void setComCreateddate(Date comCreateddate) {
        this.comCreateddate = comCreateddate;
    }

    public String getComAccount() {
        return comAccount;
    }

    public void setComAccount(String comAccount) {
        this.comAccount = comAccount == null ? null : comAccount.trim();
    }

    public Integer getComTel() {
        return comTel;
    }

    public void setComTel(Integer comTel) {
        this.comTel = comTel;
    }

    public String getComEmail() {
        return comEmail;
    }

    public void setComEmail(String comEmail) {
        this.comEmail = comEmail == null ? null : comEmail.trim();
    }

    public Integer getComState() {
        return comState;
    }

    public void setComState(Integer comState) {
        this.comState = comState;
    }
}