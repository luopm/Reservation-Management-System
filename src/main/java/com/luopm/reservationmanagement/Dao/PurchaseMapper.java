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

    int addPurchase(Purchase purchase);

    int deletePurchase(Purchase purchase);

    int updatePurchase(Purchase purchase);

    Purchase getPurchase(Purchase purchase);

    List<Purchase> getPurchaseList(Purchase purchase);

}