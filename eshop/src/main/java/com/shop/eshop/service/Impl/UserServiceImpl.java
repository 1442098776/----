package com.shop.eshop.service.Impl;

import com.shop.eshop.dto.UserQueryForm;
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

    /**
     * 根据id获取user
     * @param userId
     * @return
     */
    @Override
    public User getUserById(Long userId) {
        return userMapper.getUserById(userId);
    }

    /**
     * 获取所有的用户信息
     * @return
     */
    @Override
    public List<User> getAllUser(UserQueryForm userQueryForm) {
        return userMapper.getAllUser(userQueryForm);
    }

    /**
     * 删除用户
     * @param userIdList
     * @return
     */
    @Override
    public Integer deleteUser(List<Long> userIdList) {
        return userMapper.deleteUser(userIdList);
    }

    /**
     * 添加管理员
     * @param user
     * @return
     */
    @Override
    public Integer insertAdmin(User user) {
        return userMapper.insertAdmin(user);
    }

    /**
     * 用户忘记密码
     * @param user
     * @return
     */
    @Override
    public Integer userResetPassword(User user) {
        return userMapper.userResetPassword(user);
    }

    /**
     * 用户的启用禁用
     * @param user
     * @return
     */
//    @Override
//    public Integer updateUserStatus(User user) {
//        return userMapper.updateUserStatus(user);
//    }
}
