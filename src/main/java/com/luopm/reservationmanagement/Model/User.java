package com.luopm.reservationmanagement.Model;

import java.util.Date;

public class User {
    private Integer userId;

    private String userAccount;

    private String userPassword;

    private String userName;

    private String userFace;

    private String userIdcard;

    private Integer userType;

    private Integer userPhone;

    private String userEmail;

    private Integer userState;

    private Date userCreateddate;

    private String userComcode;

    private String userComname;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount == null ? null : userAccount.trim();
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword == null ? null : userPassword.trim();
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public String getUserFace() {
        return userFace;
    }

    public void setUserFace(String userFace) {
        this.userFace = userFace == null ? null : userFace.trim();
    }

    public String getUserIdcard() {
        return userIdcard;
    }

    public void setUserIdcard(String userIdcard) {
        this.userIdcard = userIdcard == null ? null : userIdcard.trim();
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public Integer getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(Integer userPhone) {
        this.userPhone = userPhone;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail == null ? null : userEmail.trim();
    }

    public Integer getUserState() {
        return userState;
    }

    public void setUserState(Integer userState) {
        this.userState = userState;
    }

    public Date getUserCreateddate(){return userCreateddate;}

    public void setUserCreateddate(Date userCreateddate){
        this.userCreateddate = userCreateddate;
    }

    public String getUserComcode(){return userComcode;}

    public void setUserComcode(String userComcode){this.userComcode = userComcode == null ? null : userComcode.trim();}

    public String getUserComname(){return userComname;}

    public void setUserComname(String userComname){this.userComname = userComname == null ? null : userComname.trim();}
}