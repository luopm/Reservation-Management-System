package com.luopm.reservationmanagement.Controller;


import com.luopm.reservationmanagement.Model.Reserve;
import com.luopm.reservationmanagement.Model.User;
import com.luopm.reservationmanagement.Service.ReserveService;
import com.luopm.reservationmanagement.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "/ReserveController")
public class ReserveController {

    @Autowired
    private ReserveService reserveService;

    @ResponseBody
    @RequestMapping(value = "/addReserve" )
    public Object add(Reserve reserve){
        return reserveService.add(reserve);
    }
    @ResponseBody
    @RequestMapping(value = "/deleteReserve" )
    public Object delete(Reserve reserve){
        return reserveService.delete(reserve);
    }
    @ResponseBody
    @RequestMapping(value = "/updateReserve" )
    public Object update(Reserve reserve){
        return reserveService.update(reserve);
    }
    @ResponseBody
    @RequestMapping(value = "/getReserve" )
    public Object getReserveInfo(Reserve reserve){
        return reserveService.getReserveInfo(reserve);
    }
    @ResponseBody
    @RequestMapping(value = "/getReserveList" )
    public Object getReserveList(
            @RequestParam(name="pageNum",required = false,defaultValue = "1")
                    int pageNum,
            @RequestParam(name="pageSize",required = false,defaultValue = "10")
                    int pageSize){
        return reserveService.getReserveList(pageNum, pageSize);
    }

}