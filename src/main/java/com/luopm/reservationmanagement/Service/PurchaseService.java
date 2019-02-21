package com.luopm.reservationmanagement.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.luopm.reservationmanagement.Dao.PurchaseMapper;
import com.luopm.reservationmanagement.Model.Purchase;
import com.luopm.reservationmanagement.Model.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service("PurchaseService")
public class PurchaseService {

    @Autowired
    private PurchaseMapper purchaseMapper;

    @Transactional
    public ResponseUtil add(Purchase purchase){
        ResponseUtil responseUtil = new ResponseUtil();
        purchase.setBuyCode(new Date().getTime() + ""); //获取当前毫秒数作为buyCode
        try {
            if (purchaseMapper.addPurchase(purchase) == 1){
                Purchase purchaseAdd = purchaseMapper.getPurchase(purchase);
                responseUtil.setResponseUtil(1,"add purchase success!",
                        purchaseAdd,null);
            }else responseUtil.setResponseUtil(0,"add purchase failed!",
                    null,null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    @Transactional
    public ResponseUtil delete(Purchase purchase){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            Purchase purchaseDelete = purchaseMapper.getPurchase(purchase);
            if (purchaseMapper.deletePurchase(purchase) == 1){
                responseUtil.setResponseUtil(1,"delete purchase success!",
                        purchaseDelete,null);
            }else responseUtil.setResponseUtil(0,"delete purchase failed!",
                    null,null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    @Transactional
    public ResponseUtil update(Purchase purchase){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            if (purchaseMapper.updatePurchase(purchase) == 1){
                Purchase purchaseUpdate = purchaseMapper.getPurchase(purchase);
                responseUtil.setResponseUtil(1,"update purchase success!",
                        purchaseUpdate,null);
            }else responseUtil.setResponseUtil(0,"update purchase failed!",
                    null,null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    public ResponseUtil getInfo(Purchase purchase){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            Purchase purchaseInfo = purchaseMapper.getPurchase(purchase);
            if (purchaseInfo != null){
                responseUtil.setResponseUtil(1,"getInfo purchase success!",
                        purchaseInfo,null);
            }else responseUtil.setResponseUtil(0,"getInfo purchase failed!",
                    null,null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    public ResponseUtil getList(int pageNum, int pageSize){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            //将参数传给这个方法就可以实现物理分页了，非常简单。
            PageHelper.startPage(pageNum, pageSize);
            List<Purchase> purchasesList = purchaseMapper.getPurchaseList();
            PageInfo result = new PageInfo(purchasesList);
            responseUtil.setResponseUtil(1, "get purchaseList success!",
                    result,null);//获取All用户详情
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }
}