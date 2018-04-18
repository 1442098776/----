package com.shop.eshop.mapper;

import com.shop.eshop.model.Address;
import com.shop.eshop.model.User;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

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
     * 检查用户
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