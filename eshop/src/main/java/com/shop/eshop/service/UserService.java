package com.shop.eshop.service;

import com.shop.eshop.model.User;

import java.util.List;

public interface UserService {

    int registerUser(User user);

    User userLogin(User user);

    List<User> checkUser(User user);
}
