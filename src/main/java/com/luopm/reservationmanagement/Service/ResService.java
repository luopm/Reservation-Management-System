package com.luopm.reservationmanagement.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.luopm.reservationmanagement.Dao.ResMapper;
import com.luopm.reservationmanagement.Model.Res;
import com.luopm.reservationmanagement.Model.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service("ResService")
public class ResService {

    @Autowired
    private ResMapper resMapper;

    public ResponseUtil updateRes(Res res){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            Res resUpdate = resMapper.updateResByRes(res);
            if (resUpdate != null){
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
            Res resInfo = resMapper.selectByResCode(res.getResCode());
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

    public ResponseUtil addRes(Res res){//返回对应的detail对象
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            Res resAdd = resMapper.addRes(res);
            if (resAdd != null){
                responseUtil.setResponseUtil(1, "add res success !",
                        resAdd, null);
            }else responseUtil.setResponseUtil(0, "add res failed !",
                    null, null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    public ResponseUtil deleteRes(Res res){//返回对应的detail对象
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            Res resDelete = resMapper.deleteRes(res.getResCode());
            if (resDelete != null){
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
    public ResponseUtil getResList(int pageNum, int pageSize, boolean able) {
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            //将参数传给这个方法就可以实现物理分页了，非常简单。
            PageHelper.startPage(pageNum, pageSize);
            PageInfo result;
            if (able == true){//获取可借用物品信息列表
                List<Res> resAbleList = resMapper.selectAbleResList();
                result = new PageInfo(resAbleList);
            }else{//获取所有物品列表信息
                List<Res> resList = resMapper.selectResList();
                result = new PageInfo(resList);
            }
            responseUtil.setResponseUtil(1, "get resList Success!",
                     result,null);//获取All用户详情
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }
}