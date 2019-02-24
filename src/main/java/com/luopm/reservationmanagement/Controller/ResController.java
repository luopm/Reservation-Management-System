package com.luopm.reservationmanagement.Controller;


import com.alibaba.fastjson.JSON;
import com.luopm.reservationmanagement.Model.Res;
import com.luopm.reservationmanagement.Service.ResService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;


@Controller
@RequestMapping(value = "/ResController")
public class ResController {

    @Autowired
    private ResService resService;

    @ResponseBody
    @RequestMapping(value = "/getResList" )
    public Object getResList(@RequestBody Map<String,Object> map){
        Res res = JSON.parseObject(JSON.toJSONString(map.get("res")),Res.class);
        int pageNum = JSON.parseObject(JSON.toJSONString(map.get("page"))).getIntValue("pageIndex");
        int pageSize = JSON.parseObject(JSON.toJSONString(map.get("page"))).getIntValue("pageSize");
        return resService.getResList(pageNum, pageSize, res);
    }
    @ResponseBody
    @RequestMapping(value = "/updateRes" )
    public Object ableRes(Res res){
        return resService.updateRes(res);
    }
    @ResponseBody
    @RequestMapping(value = "/getResInfo" )
    public Object getResInfo(Res res){
        return resService.getResInfo(res);
    }
    @ResponseBody
    @RequestMapping(value = "/addRes" )
    public Object addRes(Res res){
        return resService.addRes(res);
    }
    @ResponseBody
    @RequestMapping(value = "/deleteRes" )
    public Object deleteRes(Res res){
        return resService.deleteRes(res);
    }

}