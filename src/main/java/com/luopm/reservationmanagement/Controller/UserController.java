package com.luopm.reservationmanagement.Controller;


import com.luopm.reservationmanagement.Service.UserService;
import com.luopm.reservationmanagement.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping(value = "/getUserList" )
    public Object getUserList(
            @RequestParam(name="pageNum",required = false,defaultValue = "1")
                    int pageNum,
            @RequestParam(name="pageSize",required = false,defaultValue = "10")
                    int pageSize){
        return userService.getUserList(pageNum, pageSize);
    }
    @ResponseBody
    @RequestMapping(value = "/ableUser" )
    public Object ableUser(User user){
        return userService.update(user);
    }
    @ResponseBody
    @RequestMapping(value = "/resetPassword" )
    public Object resetPassword(User user){
        return userService.update(user);
    }
    @ResponseBody
    @RequestMapping(value = "/check" )
    public Object check(User user){
        return userService.update(user);
    }
    @ResponseBody
    @RequestMapping(value = "/resManage" )
    public Object resManage(User user){
        return userService.update(user);
    }
    @ResponseBody
    @RequestMapping(value = "/addUser" )
    public Object addUser(User user){
        return userService.add(user);
    }
    @ResponseBody
    @RequestMapping(value = "/deleteUser" )
    public Object deleteUser(User user){
        return userService.delete(user);
    }
    @ResponseBody
    @RequestMapping(value = "/getUserInfo")
    public Object getUserInfo(User user){
        return userService.getUserInfo(user);
    }

}