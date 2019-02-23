package com.luopm.reservationmanagement.Dao;

import com.luopm.reservationmanagement.Model.Res;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ResMapper {

    List<Res> getResList(Res res);

    int updateRes(Res res);

    Res getRes(Res res);

    int addRes(Res res);

    int deleteRes(Res res);
}