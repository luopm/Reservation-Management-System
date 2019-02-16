package com.luopm.reservationmanagement.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.luopm.reservationmanagement.Dao.ReserveMapper;
import com.luopm.reservationmanagement.Model.Reserve;
import com.luopm.reservationmanagement.Model.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service("ReserveService")
public class ReserveService {

    @Autowired
    private ReserveMapper reserveMapper;

    @Transactional
    public ResponseUtil add(Reserve reserve){
        ResponseUtil responseUtil = new ResponseUtil();
        reserve.setBorStartdate(new Date());
        try {
            if (reserveMapper.addReserve(reserve) >= 1){
                Reserve reserveAdd = reserveMapper.getReserve(reserve);
                responseUtil.setResponseUtil(1, "add reserve success!",
                        reserveAdd, null);
            }else responseUtil.setResponseUtil(0, "add reserve falied!",
                    null, null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    @Transactional
    public ResponseUtil delete(Reserve reserve){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            Reserve reserveDelete = reserveMapper.getReserve(reserve);
            if (reserveMapper.deleteReserve(reserve) == 1){
                responseUtil.setResponseUtil(1, "delete reserve success!",
                        reserveDelete, null);
            }else responseUtil.setResponseUtil(1, "delete reserve failed!",
                    null, null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    @Transactional
    public ResponseUtil update(Reserve reserve){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            if (reserveMapper.updateReserve(reserve) == 1){
                Reserve reserveUpdate = reserveMapper.getReserve(reserve);
                responseUtil.setResponseUtil(1, "update reserve success!",
                        reserveUpdate, null);
            }else responseUtil.setResponseUtil(1, "update reserve failed!",
                    null, null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }
    public ResponseUtil getReserveInfo(Reserve reserve){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            Reserve reserveInfo = reserveMapper.getReserve(reserve);
            if (reserveInfo != null){
                responseUtil.setResponseUtil(1, "get reserveInfo success!",
                        reserveInfo, null);
            }else responseUtil.setResponseUtil(1, "get reserveInfo failed!",
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
}