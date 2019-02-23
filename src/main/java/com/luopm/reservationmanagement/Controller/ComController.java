package com.luopm.reservationmanagement.Controller;


import com.alibaba.fastjson.JSON;
import com.luopm.reservationmanagement.Model.Com;
import com.luopm.reservationmanagement.Service.ComService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;


@Controller
@RequestMapping(value = "/ComController")
public class ComController {

    @Autowired
    private ComService comService;

    @ResponseBody
    @RequestMapping(value = "/getComList" )
    public Object getComList(@RequestBody Map<String,Object> map){
        Com com = JSON.parseObject(JSON.toJSONString(map.get("com")),Com.class);
        int pageNum = JSON.parseObject(JSON.toJSONString(map.get("page"))).getIntValue("pageIndex");
        int pageSize = JSON.parseObject(JSON.toJSONString(map.get("page"))).getIntValue("pageSize");
        return comService.getComList(pageNum, pageSize, com);
    }
    @ResponseBody
    @RequestMapping(value = "/addCom" )
    public Object addCom(Com com){
        return comService.add(com);
    }
    @ResponseBody
    @RequestMapping(value = "/deleteCom" )
    public Object deleteCom(Com com){
        return comService.delete(com);
    }
    @ResponseBody
    @RequestMapping(value = "/updateCom" )
    public Object updateCom(Com com){
        return comService.update(com);
    }
    @ResponseBody
    @RequestMapping(value = "/getComInfo")
    public Object getComInfo(Com com){
        return comService.getComInfo(com);
    }

}