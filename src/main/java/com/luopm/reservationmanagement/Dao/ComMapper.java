package com.luopm.reservationmanagement.Dao;

import com.luopm.reservationmanagement.Model.Com;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ComMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Com record);

    int insertSelective(Com record);

    Com selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Com record);

    int updateByPrimaryKey(Com record);


    int updateCom(Com com);

    int addCom(Com com);

    int deleteCom(Com com);

    Com getCom(Com com);

    List<Com> getComList(Com com);

}