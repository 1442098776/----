package com.shop.eshop.service.Impl;

import com.shop.eshop.mapper.UserMapper;
import com.shop.eshop.model.User;
import com.shop.eshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    /**
     * 注册用户
     * @param user
     * @return
     */
    @Override
    public int registerUser(User user) {
        return userMapper.registerUser(user);
    }

    /**
     * 用户登录
     * @param user
     * @return
     */
    @Override
    public User userLogin(User user) {
        return userMapper.userLogin(user);
    }

    /**
     * 检查用户
     * @param user
     * @return
     */
    @Override
    public List<User> checkUser(User user) {
        return userMapper.checkUser(user);
    }

    /**
     * 更新用户信息
     * @param user
     * @return
     */
    @Override
    public Integer updateUserById(User user) {
        return userMapper.updateUserById(user);
    }
}
