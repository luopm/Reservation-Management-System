package com.luopm.reservationmanagement.Dao;

import com.luopm.reservationmanagement.Model.User;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Repository
public interface UserMapper {

    int deleteByPrimaryKey(Integer userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer userId);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    int updateUser(User user);

    int addUser(User user);

    int deleteUser(User user);

    User getUser(User user);

    List<User> getUserList();

    User getLogin(User user);
}