package com.luopm.reservationmanagement.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.luopm.reservationmanagement.Dao.UserMapper;
import com.luopm.reservationmanagement.Model.ResponseUtil;
import com.luopm.reservationmanagement.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service("UserService")
public class UserService {

    @Autowired
    private UserMapper userMapper;


    public ResponseUtil getUserList(int pageNum, int pageSize){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
//            //将参数传给这个方法就可以实现物理分页了，非常简单。
            PageHelper.startPage(pageNum, pageSize);
            List<User> userList = userMapper.selectAllUser();
            PageInfo result = new PageInfo(userList);
            responseUtil.setResponseUtil(1, "get userList success!",
                     result,null);//获取All用户
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    public ResponseUtil update(User user){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            User userUpdate = userMapper.update(user);
            if (userUpdate != null){//注册用户
                responseUtil.setResponseUtil(1, "update user success!",
                        userUpdate, null);
            }else responseUtil.setResponseUtil(0, "update user failed!",
                    null, null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    public ResponseUtil add(User user){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            User userAdd = userMapper.add(user);
            if (userAdd != null){//注册用户
                responseUtil.setResponseUtil(1, "add user success!",
                        userAdd, null);
            }else responseUtil.setResponseUtil(0, "add user failed!",
                    null, null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }
    public ResponseUtil delete(User user){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            User userDelete = userMapper.delete(user);
            if (userDelete != null){//注册用户
                responseUtil.setResponseUtil(1, "delete user success!",
                        userDelete, null);
            }else responseUtil.setResponseUtil(0, "delete user failed!",
                    null, null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    /*
     * 这个方法中用到了我们开头配置依赖的分页插件pagehelper
     * 很简单，只需要在service层传入参数，然后将参数传递给一个插件的一个静态方法即可；
     * pageNum 开始页数
     * pageSize 每页显示的数据条数
     * */
    public ResponseUtil getUserInfo(User user) {
        ResponseUtil responseUtil = new ResponseUtil();
        try{
            User userInfo = userMapper.selectByUserAccount(user.getUserAccount());
            if (userInfo != null){
                responseUtil.setResponseUtil(1,"get userInfo success!",
                        userInfo, null);
            }else responseUtil.setResponseUtil(0,"get userInfo failed!",
                    null, null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }
}