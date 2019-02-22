package com.luopm.reservationmanagement.Controller;


import com.alibaba.fastjson.JSON;
import com.luopm.reservationmanagement.Model.Reserve;
import com.luopm.reservationmanagement.Service.ReserveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;


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
    public Object getReserveList(@RequestBody Map<String,Object> map){
            Reserve reserve = JSON.parseObject(JSON.toJSONString(map.get("reserve")),Reserve.class);
            int pageNum = JSON.parseObject(JSON.toJSONString(map.get("page"))).getIntValue("pageIndex");
            int pageSize = JSON.parseObject(JSON.toJSONString(map.get("page"))).getIntValue("pageSize");
        return reserveService.getReserveList(pageNum, pageSize, reserve);
    }

}