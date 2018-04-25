package com.shop.eshop.service;

import com.shop.eshop.dto.UserQueryForm;
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

    /**
     * 根据id获取用户
     * @param userId
     * @return
     */
    User getUserById(Long userId);

    /**
     * 获取所有的用户信息
     * @return
     */
    List<User> getAllUser(UserQueryForm userQueryForm);

    /**
     * 用户的启用禁用
     * @param user
     * @return
     */
//    Integer updateUserStatus(User user);

    /**
     * 删除用户
     * @param userIdList
     * @return
     */
    Integer deleteUser(List<Long> userIdList);

    /**
     * 添加管理员
     * @param user
     * @return
     */
    Integer insertAdmin(User user);
}
