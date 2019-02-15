package com.luopm.reservationmanagement.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.luopm.reservationmanagement.Dao.ResMapper;
import com.luopm.reservationmanagement.Model.Res;
import com.luopm.reservationmanagement.Model.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("ResService")
public class ResService {

    @Autowired
    private ResMapper resMapper;

    @Transactional
    public ResponseUtil updateRes(Res res){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            if (resMapper.updateRes(res) == 1){
                Res resUpdate = resMapper.getRes(res);
                responseUtil.setResponseUtil(1,"res Update success !",
                        resUpdate,null);
            }else responseUtil.setResponseUtil(0,"res Update failed !",
                    null ,null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    public ResponseUtil getResInfo(Res res){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            Res resInfo = resMapper.getRes(res);
            if (resInfo != null){
                responseUtil.setResponseUtil(1, "get ResInfo success !",
                        resInfo,null);
            }else responseUtil.setResponseUtil(0, "get ResInfo failed !",
                    null,null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    @Transactional
    public ResponseUtil addRes(Res res){//返回对应的detail对象
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            if (resMapper.addRes(res) >= 1){
                try{
                    Res resAdd = resMapper.getRes(res);
                    if (resAdd != null){
                        responseUtil.setResponseUtil(1, "add res success !",
                                resAdd, null);
                    }else responseUtil.setResponseUtil(0, "add res failed !",
                            null, null);
                }catch (Exception e){}
            }
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    @Transactional
    public ResponseUtil deleteRes(Res res){//返回对应的RES对象
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            Res resDelete = resMapper.getRes(res);
            if (resMapper.deleteRes(res) == 1){
                responseUtil.setResponseUtil(1, "res Delete success !",
                        resDelete, null);
            }else responseUtil.setResponseUtil(0,"res Delete success !",
                    null,null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    /*
     * 这个方法中用到了我们开头配置依赖的分页插件pagehelper
     * 很简单，只需要在service层传入参数，然后将参数传递给一个插件的一个静态方法即可；
     * pageNum 开始页数
     * pageSize 每页显示的数据条数
     * */
    public ResponseUtil getResList(int pageNum, int pageSize, Res res) {
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            //将参数传给这个方法就可以实现物理分页了，非常简单。
            PageHelper.startPage(pageNum, pageSize);
            PageInfo result;
            List<Res> resList = resMapper.getResList(res);
            result = new PageInfo(resList);
            responseUtil.setResponseUtil(1, "get resList Success!",
                     result,null);//获取All用户详情
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }
}