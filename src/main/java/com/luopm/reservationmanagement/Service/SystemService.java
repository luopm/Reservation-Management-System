package com.luopm.reservationmanagement.Service;

import com.luopm.reservationmanagement.Dao.UserMapper;
import com.luopm.reservationmanagement.Model.ResponseUtil;
import com.luopm.reservationmanagement.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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