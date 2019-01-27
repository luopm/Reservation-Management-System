package com.luopm.reservationmanagement.Controller;


import com.luopm.reservationmanagement.Model.Purchase;
import com.luopm.reservationmanagement.Service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "/user")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @ResponseBody
    @RequestMapping(value = "/add" )
    public Object add(Purchase purchase){
        return purchaseService.add(purchase);
    }
    @ResponseBody
    @RequestMapping(value = "/delete" )
    public Object delete(Purchase purchase){
        return purchaseService.delete(purchase);
    }
    @ResponseBody
    @RequestMapping(value = "/update" )
    public Object update(Purchase purchase){
        return purchaseService.update(purchase);
    }
    @ResponseBody
    @RequestMapping(value = "/getInfo" )
    public Object getPurchaseInfo(Purchase purchase){
        return purchaseService.getInfo(purchase);
    }
    @ResponseBody
    @RequestMapping(value = "/getList" )
    public Object getPurchaseList(
            @RequestParam(name="pageNum",required = false,defaultValue = "1")
                    int pageNum,
            @RequestParam(name="pageSize",required = false,defaultValue = "10")
                    int pageSize){
        return purchaseService.getList(pageNum, pageSize);
    }


}