package com.luopm.reservationmanagement.Dao;

import com.luopm.reservationmanagement.Model.Reserve;
import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReserveMapper {

    int deleteByPrimaryKey(Integer borId);

    int insert(Reserve record);

    int insertSelective(Reserve record);

    Reserve selectByPrimaryKey(Integer borId);

    int updateByPrimaryKeySelective(Reserve record);

    int updateByPrimaryKeyWithBLOBs(Reserve record);

    int updateByPrimaryKey(Reserve record);

    int addReserve(Reserve reserve);

    int deleteReserve(Reserve reserve);

    int updateReserve(Reserve reserve);

    Reserve getReserve(Reserve reserve);

    List<Reserve> getReserveList();

}