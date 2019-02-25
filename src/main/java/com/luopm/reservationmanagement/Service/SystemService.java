package com.luopm.reservationmanagement.Service;

import com.alibaba.druid.support.json.JSONParser;
import com.alibaba.druid.support.json.JSONUtils;
import com.alibaba.fastjson.JSON;
import com.baidu.aip.face.AipFace;
import com.luopm.reservationmanagement.Dao.UserMapper;
import com.luopm.reservationmanagement.Model.FaceRequest;
import com.luopm.reservationmanagement.Model.ResponseUtil;
import com.luopm.reservationmanagement.Model.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;


@Service("SystemService")
public class SystemService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserService userService;

    public ResponseUtil login(User user){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            User userLogin = userMapper.getLogin(user);
            if ( userLogin != null){
                responseUtil .setResponseUtil(1,"Login success!",
                        userLogin,null);
            }
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    @Transactional
    public ResponseUtil register(User user){
        return userService.add(user);
    }

}