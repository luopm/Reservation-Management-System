package com.luopm.reservationmanagement.Controller;


import com.luopm.reservationmanagement.Model.Res;
import com.luopm.reservationmanagement.Service.ResService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "/ResController")
public class ResController {

    @Autowired
    private ResService resService;

    @ResponseBody
    @RequestMapping(value = "/getResList" )
    public Object getResList(
            @RequestParam(name="pageNum",required = false,defaultValue = "1")
                    int pageNum,
            @RequestParam(name="pageSize",required = false,defaultValue = "10")
                    int pageSize,
            @RequestParam(name="res",required = false)
                    Res res
            ){
        return resService.getResList(pageNum, pageSize, res);
    }
    @ResponseBody
    @RequestMapping(value = "/ableRes" )
    public Object ableRes(Res res){
        return resService.updateRes(res);
    }
    @ResponseBody
    @RequestMapping(value = "/outOfUse" )
    public Object outOfUse(Res res){
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