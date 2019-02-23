package com.luopm.reservationmanagement.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.luopm.reservationmanagement.Dao.ComMapper;
import com.luopm.reservationmanagement.Model.Com;
import com.luopm.reservationmanagement.Model.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("ComService")
public class ComService {

    @Autowired
    private ComMapper comMapper;

    public ResponseUtil getComList(int pageNum, int pageSize, Com com){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
//            //将参数传给这个方法就可以实现物理分页了，非常简单。
            PageHelper.startPage(pageNum, pageSize);
            List<Com> comList = comMapper.getComList(com);
            PageInfo result = new PageInfo(comList);
            responseUtil.setResponseUtil(1, "get comList success!",
                     result,null);//获取All用户
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    @Transactional
    public ResponseUtil update(Com com){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            if (comMapper.updateCom(com) == 1){//注册用户
                Com comUpdate = comMapper.getCom(com);
                responseUtil.setResponseUtil(1, "update com success!",
                        comUpdate, null);
            }else responseUtil.setResponseUtil(0, "update com failed!",
                    null, null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    @Transactional
    public ResponseUtil add(Com com){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            if (comMapper.addCom(com) >= 1){//注册用户
                try{
                    Com comAdd = comMapper.getCom(com);
                    if (comAdd != null){//获取刚才注册用户
                        responseUtil.setResponseUtil(1, "add com success!",
                                comAdd, null);
                    }else responseUtil.setResponseUtil(0, "add com failed!",
                            null, null);
                }catch (Exception e){}
            }
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }

    @Transactional
    public ResponseUtil delete(Com com){
        ResponseUtil responseUtil = new ResponseUtil();
        try {
            Com comDelete = comMapper.getCom(com);
            if (comMapper.deleteCom(com) == 1){//注册用户
                responseUtil.setResponseUtil(1, "delete com success!",
                        comDelete, null);
            }else responseUtil.setResponseUtil(0, "delete com failed!",
                    null, null);
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
    public ResponseUtil getComInfo(Com com) {
        ResponseUtil responseUtil = new ResponseUtil();
        try{
            Com comInfo = comMapper.getCom(com);
            if (comInfo != null){
                responseUtil.setResponseUtil(1,"get comInfo success!",
                        comInfo, null);
            }else responseUtil.setResponseUtil(0,"get comInfo failed!",
                    null, null);
        }catch (Exception e){
            responseUtil.setResultMsg(e.getMessage());
        }
        return responseUtil;
    }
}