package com.luopm.reservationmanagement.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.luopm.reservationmanagement.Dao.PurchaseMapper;
import com.luopm.reservationmanagement.Dao.UserMapper;
import com.luopm.reservationmanagement.Model.Purchase;
import com.luopm.reservationmanagement.Model.ResponseUtil;
import com.luopm.reservationmanagement.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("SystemService")
public class SystemService {

    @Autowired
    private PurchaseMapper purchaseMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserService userService;

    public ResponseUtil login(User user){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            if (userMapper.getUser(user) >= 1){
                responseUtil = userService.getUserInfo(user);
            }
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    public ResponseUtil register(User user){
        return userService.add(user);
    }
}