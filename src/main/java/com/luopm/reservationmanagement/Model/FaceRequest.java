package com.luopm.reservationmanagement.Model;

public class FaceRequest {

    private String image;

    private String imageType = "BASE64";

    private String groupId;

    private String userId;

    private String user_info;

    private static final String APP_ID = "15621242";

    private static final String API_KEY = "jW5Rm2x5DXADcsCOfVLoG88A";

    private static final String SECRET_KEY = "PxQQbXdA0Sd8LCEpnQlvu1Lki7i3VyQB";

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        if (image == null){
            this.image = null;
        }else {
            image = image.trim();
            if (image.length() > 100){
                this.image = image.substring(22, image.length());
            }else this.image = image;
        }
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        if (imageType != null){
            this.imageType = imageType.trim();
        }
    }

    public String getGroupId(){return groupId;}

    public void setGroupId(String groupId){
        this.groupId = groupId == null ? null : groupId.trim();
    }

    public String getUserId(){
        return userId;
    }

    public void setUserId(String userId){
        this.userId = userId == null ? null : userId.trim();
    }

    public String getUser_info() {
        return user_info;
    }

    public void setUser_info(String user_info) {
        this.user_info = user_info == null ? null : user_info.trim();
    }

    public String getAppId(){
        return APP_ID;
    }
    public String getApiKey(){
        return API_KEY;
    }
    public String getSecretKey(){
        return SECRET_KEY;
    }
}