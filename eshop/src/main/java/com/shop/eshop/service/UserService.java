package com.shop.eshop.service;

import com.shop.eshop.model.User;

import java.util.List;

public interface UserService {

    /**
     * 注册用户
     * @param user
     * @return
     */
    int registerUser(User user);

    /**
     * 用户登录
     * @param user
     * @return
     */
    User userLogin(User user);

    /**
     * 检查用户的唯一性
     * @param user
     * @return
     */
    List<User> checkUser(User user);

    /**
     * 更新用户信息
     * @param user
     * @return
     */
    Integer updateUserById(User user);
}
