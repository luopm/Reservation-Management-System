package com.luopm.reservationmanagement.Dao;

import com.luopm.reservationmanagement.Model.User;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserMapper {

    int updateUser(User user);

    int addUser(User user);

    int deleteUser(User user);

    User getUser(User user);

    List<User> getUserList(User user);

    User getLogin(User user);
}