package com.luopm.reservationmanagement.Dao;

import com.luopm.reservationmanagement.Model.Res;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ResMapper {

    int deleteByPrimaryKey(Integer resId);

    int insert(Res record);

    int insertSelective(Res record);

    Res selectByPrimaryKey(Integer resId);

    int updateByPrimaryKeySelective(Res record);

    int updateByPrimaryKey(Res record);

    List<Res> selectResList();

    List<Res> selectAbleResList();

    Res updateResByRes(Res res);

    Res selectByResCode(String resCode);

    Res addRes(Res res);

    Res deleteRes(String resCode);
}