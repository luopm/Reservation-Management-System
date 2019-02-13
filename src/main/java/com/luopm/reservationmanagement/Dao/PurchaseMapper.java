package com.luopm.reservationmanagement.Dao;

import com.luopm.reservationmanagement.Model.Purchase;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PurchaseMapper {

    int deleteByPrimaryKey(Integer buyId);

    int insert(Purchase record);

    int insertSelective(Purchase record);

    Purchase selectByPrimaryKey(Integer buyId);

    int updateByPrimaryKeySelective(Purchase record);

    int updateByPrimaryKeyWithBLOBs(Purchase record);

    int updateByPrimaryKey(Purchase record);

    Purchase add(Purchase purchase);

    Purchase delete(Purchase purchase);

    Purchase update(Purchase purchase);

    Purchase getInfo(String buyCode);

    List<Purchase> getList();

}