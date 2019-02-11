package com.luopm.reservationmanagement.Controller;


import com.luopm.reservationmanagement.Model.Purchase;
import com.luopm.reservationmanagement.Model.User;
import com.luopm.reservationmanagement.Service.PurchaseService;
import com.luopm.reservationmanagement.Service.SystemService;
import com.luopm.reservationmanagement.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "/System")
public class SystemController {

    @Autowired
    private SystemService systemService;

    @ResponseBody
    @RequestMapping(value = "/Login" )
    public Object login(User user){
        return  systemService.login(user);
    }
    @ResponseBody
    @RequestMapping(value = "/Register" )
    public Object register(User user){
        return  systemService.login(user);
    }
}