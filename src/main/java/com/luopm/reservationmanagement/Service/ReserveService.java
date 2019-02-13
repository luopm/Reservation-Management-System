package com.luopm.reservationmanagement.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.luopm.reservationmanagement.Dao.ReserveMapper;
import com.luopm.reservationmanagement.Model.Reserve;
import com.luopm.reservationmanagement.Model.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service("ReserveService")
public class ReserveService {

    @Autowired
    private ReserveMapper reserveMapper;

    public ResponseUtil add(Reserve reserve){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            Reserve reserveAdd = reserveMapper.add(reserve);
            if (reserveAdd != null){
                responseUtil.setResponseUtil(1, "add reserve success!",
                        reserveAdd, null);
            }else responseUtil.setResponseUtil(1, "add reserve success!",
                    null, null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    public ResponseUtil delete(Reserve reserve){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            Reserve reserveDelete = reserveMapper.delete(reserve);
            if (reserveDelete != null){
                responseUtil.setResponseUtil(1, "delete reserve success!",
                        reserveDelete, null);
            }else responseUtil.setResponseUtil(1, "delete reserve success!",
                    null, null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }
    public ResponseUtil update(Reserve reserve){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            Reserve reserveUpdate = reserveMapper.update(reserve);
            if (reserveUpdate != null){
                responseUtil.setResponseUtil(1, "update reserve success!",
                        reserveUpdate, null);
            }else responseUtil.setResponseUtil(1, "update reserve success!",
                    null, null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }
    public ResponseUtil getReserveInfo(Reserve reserve){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            Reserve reserveInfo = reserveMapper.getReserveInfo(reserve.getBorCode());
            if (reserveInfo != null){
                responseUtil.setResponseUtil(1, "get reserveInfo success!",
                        reserveInfo, null);
            }else responseUtil.setResponseUtil(1, "get reserveInfo success!",
                    null, null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }
    public ResponseUtil getReserveList(int pageNum, int pageSize){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            //将参数传给这个方法就可以实现物理分页了，非常简单。
            PageHelper.startPage(pageNum, pageSize);
            List<Reserve> reserveList = reserveMapper.getReserveList();
            PageInfo result = new PageInfo(reserveList);
            responseUtil.setResponseUtil(1, "get reserveList success!",
                    result,null);//获取All用户详情
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }
//    public ResponseUtil Login(User user){
//        ResponseUtil responseUtil = new ResponseUtil();
//        try {
//            User Ruser = userMapper.selectUsersByUserName(user);
//            if (Ruser == null){
//                responseUtil.setResultCode(-1);
//                responseUtil.setResultMsg("用户不存在");
//            }
//            else if ( Ruser.getPhotomeUserUserpassword().equals(user.getPhotomeUserUserpassword()) ){
//                UserDetail userDetail = new UserDetail();
//                userDetail.setPhotomeUserdetailUsername(Ruser.getPhotomeUserUsername());
//                responseUtil.setResponseUtil(1,"登录成功",
//                        userDetailMapper.selectDetailByUserName(userDetail),null);
//            }
//        }catch (Exception e){
//            responseUtil.setResultMsg(e.getMessage());
//        }
//        return responseUtil;
//    }
//
//    public ResponseUtil addUser(User user){
//        user.setPhotomeUserUsercreatdate(new Date());
//        ResponseUtil responseUtil = new ResponseUtil();
//        try {
//            if (userMapper.insert(user) >= 1){//注册用户
//                UserDetail userDetail = new UserDetail();
//                userDetail.setPhotomeUserdetailUsername(user.getPhotomeUserUsername());
//                if (userDetailMapper.insert(userDetail) >= 1){//注册用户详情
//                    responseUtil.setResponseUtil(1, "新增用户成功",
//                            userDetail, null);
//                }
//            }
//        }catch (Exception e){
//            responseUtil.setResultMsg(e.getMessage());
//        }
//        return responseUtil;
//    }
//
//    public ResponseUtil deleteUser(User user){
//        ResponseUtil responseUtil = new ResponseUtil();
//        try {
//            if (userMapper.deleteByUserName(user) >= 1){//删除用户
//                UserDetail userDetail = new UserDetail();
//                userDetail.setPhotomeUserdetailUsername(user.getPhotomeUserUsername());
//                if (userDetailService.deleteUserDetail(userDetail).getResultCode() == 1){//删除用户详情及photo、music
//                    responseUtil.setResponseUtil(1, "删除用户成功",
//                            1, null);
//                }
//            }
//        }catch (Exception e){
//            responseUtil.setResultMsg(e.getMessage());
//        }
//        return responseUtil;
//    }
//
//    public ResponseUtil updateUser(User user){
//        ResponseUtil responseUtil = new ResponseUtil();
//        try {
//            if (userMapper.updateUser(user) >= 1){
//                UserDetail userDetail = new UserDetail();//获取用户详情
//                userDetail.setPhotomeUserdetailUsername(user.getPhotomeUserUsername());
//                responseUtil.setResponseUtil(1, "修改用户成功",
//                        userDetailMapper.selectDetailByUserName(userDetail),null);
//            }
//        }catch (Exception e){
//            responseUtil.setResultMsg(e.getMessage());
//        }
//        return responseUtil;
//    }
//
//    public ResponseUtil getUser(User user){//返回对应的detail对象
//        ResponseUtil responseUtil = new ResponseUtil();
//        try {
//            UserDetail userDetail = new UserDetail();//获取用户详情
//            userDetail.setPhotomeUserdetailUsername(user.getPhotomeUserUsername());
//            userDetail = userDetailMapper.selectDetailByUserName(userDetail);
//            if (userDetail != null){
//                responseUtil.setResponseUtil(1, "获取用户详情成功",
//                        userDetail, null);
//            }
//        }catch (Exception e){
//            responseUtil.setResultMsg(e.getMessage());
//        }
//        return responseUtil;
//    }
//
//    /*
//     * 这个方法中用到了我们开头配置依赖的分页插件pagehelper
//     * 很简单，只需要在service层传入参数，然后将参数传递给一个插件的一个静态方法即可；
//     * pageNum 开始页数
//     * pageSize 每页显示的数据条数
//     * */
//    public ResponseUtil getAllUser(int pageNum, int pageSize) {
//        ResponseUtil responseUtil = new ResponseUtil();
//        try {
//            //将参数传给这个方法就可以实现物理分页了，非常简单。
////            PageHelper.startPage(pageNum, pageSize);
////            List<User> userList = userMapper.selectALLUsers();
////            PageInfo result = new PageInfo(userList);
//            responseUtil.setResponseUtil(1, "获取用户成功",
//                     userDetailService.getAllUserDetail(pageNum,pageSize).getResultObject(),null);//获取All用户详情
//        }catch (Exception e){
//            responseUtil.setResultMsg(e.getMessage());
//        }
//        return responseUtil;
//    }
}