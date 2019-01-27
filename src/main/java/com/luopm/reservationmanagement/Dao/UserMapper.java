package com.luopm.reservationmanagement.Dao;

import com.luopm.reservationmanagement.Model.User;

import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface UserMapper {

    int deleteByPrimaryKey(Integer userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer userId);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    User update(User user);

    User add(User user);

    User delete(User user);

    User selectByUserAccount(String userAccount);

    List<User> selectAllUser();
}