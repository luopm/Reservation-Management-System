package com.luopm.reservationmanagement.Dao;

import com.luopm.reservationmanagement.Model.Reserve;

import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ReserveMapper {

    int deleteByPrimaryKey(Integer borId);

    int insert(Reserve record);

    int insertSelective(Reserve record);

    Reserve selectByPrimaryKey(Integer borId);

    int updateByPrimaryKeySelective(Reserve record);

    int updateByPrimaryKeyWithBLOBs(Reserve record);

    int updateByPrimaryKey(Reserve record);

    Reserve add(Reserve reserve);

    Reserve delete(Reserve reserve);

    Reserve update(Reserve reserve);

    Reserve getReserveInfo(String borCode);

    List<Reserve> getReserveList();

}