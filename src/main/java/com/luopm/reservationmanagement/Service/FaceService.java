package com.luopm.reservationmanagement.Service;

import com.alibaba.fastjson.JSON;
import com.baidu.aip.face.AipFace;
import com.luopm.reservationmanagement.Dao.UserMapper;
import com.luopm.reservationmanagement.Model.FaceRequest;
import com.luopm.reservationmanagement.Model.ResponseUtil;
import com.luopm.reservationmanagement.Model.User;
import com.sun.javafx.collections.MappingChange;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;


@Service("FaceService")
public class FaceService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserService userService;

    //005.人脸识别登录
    public ResponseUtil searchFace(FaceRequest faceRequest){
        //使用Ajax提交base64字符串，需要经过去头转码
        String image = faceRequest.getImage();
        String imageType = faceRequest.getImageType();
        String groupId   = faceRequest.getGroupId();
        String userId    = faceRequest.getUserId();
        AipFace client = new AipFace(faceRequest.getAppId(), faceRequest.getApiKey(), faceRequest.getSecretKey());
        HashMap<String,String> options = new HashMap<String,String>();  //请求预置参数
        options.put("user_id",userId);
        options.put("liveness_control","NORMAL");   //活体检测，级别低到高：LOW，NORMAL，HIGH
        JSONObject res = client.search(image,imageType,groupId, options);    //人脸库搜索
        Map map = JSON.parseObject(res.toString(),Map.class);
        ResponseUtil responseUtil = new ResponseUtil();
        String resMsg = "";
        responseUtil.setResponseUtil(0, resMsg, map,null);
        if (res.get("error_code").toString().equals("222202")) resMsg = "没有人脸信息或人脸数量非1，请重新拍照！";
        else if (res.get("error_code").toString().equals("222207"))resMsg = "人脸库中没有您的注册信息，请先注册。";
        else if (res.get("error_code").toString().equals("223120"))resMsg = "请正确登录，不得伪造！";
        else if (res.get("error_msg").toString().equals("SUCCESS")){
            resMsg = "FaceLogin success!";
            responseUtil.setResponseUtil(1, resMsg, map,null);
        }responseUtil.setResultMsg(resMsg);
        return responseUtil;
    }

    public ResponseUtil addFace(FaceRequest faceRequest) {
        AipFace client = new AipFace(faceRequest.getAppId(), faceRequest.getApiKey(), faceRequest.getSecretKey());
        String image = faceRequest.getImage();
        String userInfo = faceRequest.getUser_info();
        // 传入可选参数调用接口
        HashMap<String, String> options = new HashMap<String, String>();
        options.put("user_info", userInfo);
        options.put("quality_control", "NORMAL");
        options.put("liveness_control", "LOW");

//        String image = "取决于image_type参数，传入BASE64字符串或URL字符串或FACE_TOKEN字符串";
        String imageType = faceRequest.getImageType();
        String groupId   = faceRequest.getGroupId();
        String userId    = faceRequest.getUserId();

        // 人脸注册
        JSONObject res = client.addUser(image, imageType, groupId, userId, options);
        Map map = JSON.parseObject(res.toString(),Map.class);
        ResponseUtil responseUtil = new ResponseUtil();
        if (res.get("error_msg").toString().equals("SUCCESS")){
            User user = new User();
            user.setUserAccount(userId);
            Map result = JSON.parseObject(res.get("result").toString(),Map.class);
            user.setUserFace(result.get("face_token").toString());
            try{
                if (userMapper.updateUser(user) >= 1){
                    responseUtil.setResponseUtil(1, "Update User Face success!",
                            map, null);
                }
            }catch (Exception e){
                responseUtil.setResultMsg(e.getMessage());
            }
        }else responseUtil.setResponseUtil(0, "Update User Face failed!",
                map, null);
        return responseUtil;
    }

    public String updateFace(FaceRequest faceRequest) {
        AipFace client = new AipFace(faceRequest.getAppId(), faceRequest.getApiKey(), faceRequest.getSecretKey());
        String userInfo = faceRequest.getUser_info();
        // 传入可选参数调用接口
        HashMap<String, String> options = new HashMap<String, String>();
        options.put("user_info", userInfo);
        options.put("quality_control", "NORMAL");
        options.put("liveness_control", "LOW");
//        String image = "取决于image_type参数，传入BASE64字符串或URL字符串或FACE_TOKEN字符串";
        String image     = faceRequest.getImage();
        String imageType = faceRequest.getImageType();
        String groupId   = faceRequest.getGroupId();
        String userId    = faceRequest.getUserId();

        // 人脸更新
        JSONObject res = client.updateUser(image, imageType, groupId, userId, options);
        return res.toString();
    }

    public String deleteFace(FaceRequest faceRequest) {
        AipFace client = new AipFace(faceRequest.getAppId(), faceRequest.getApiKey(), faceRequest.getSecretKey());
        // 传入可选参数调用接口
        HashMap<String, String> options = new HashMap<String, String>();
        String faceToken = faceRequest.getImage();
        String groupId   = faceRequest.getGroupId();
        String userId    = faceRequest.getUserId();

        // 人脸删除
        JSONObject res = client.faceDelete(userId, groupId, faceToken, options);
        return res.toString();
    }

    public String addGroup(FaceRequest faceRequest) {
        AipFace client = new AipFace(faceRequest.getAppId(), faceRequest.getApiKey(), faceRequest.getSecretKey());
        // 传入可选参数调用接口
        HashMap<String, String> options = new HashMap<String, String>();
        String groupId = faceRequest.getGroupId();

        // 创建用户组
        JSONObject res = client.groupAdd(groupId, options);
//        System.out.println(res.toString(2));
        return res.toString();
    }

}