package com.shop.eshop.controller;

import com.shop.eshop.dto.UserQueryForm;
import com.shop.eshop.model.User;
import com.shop.eshop.service.UserService;
import com.shop.eshop.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @date 2018 -
 */
@RestController
public class AdminUserControlller {
    @Autowired
    private UserService userService;

    /**
     * 获取所有的用户信息
     * @return
     */
    @PostMapping("/admin/getAllUser")
    public List<User> getAllUser(UserQueryForm userQueryForm, HttpServletRequest request){
        User user = (User) request.getSession().getAttribute("adminUser");
        List<User> userList = userService.getAllUser(userQueryForm);
        for(int i = 0;i < userList.size();i++){
            User user1 = userList.get(i);
            if(user1.getUserId() == user.getUserId()){
                userList.remove(i);
                break;
            }
        }
        return userList;
    }

    /**
     * 更新用户信息
     * @param user
     * @return
     */
    @PostMapping("/admin/updateUser")
    public String updateUserStatus(User user){
        user.setModifyTime(new Date());
        Integer is_update = userService.updateUserById(user);
        if(is_update != null && is_update > 0){
            return "1";
        }else{
            return "0";
        }
    }

    /**
     * 用户启用禁用
     * @param id
     * @return
     */
    @PostMapping("/admin/deleteUser")
    public String adminDeleteUser(String id){
        String[] idStrs = id.split(",");
        List<Long> idList = new ArrayList<>();
        for(String idStr :idStrs){
            idList.add(Long.parseLong(idStr));
        }
        Integer is_delete = userService.deleteUser(idList);
        if(is_delete != null && is_delete > 0){
            return "1";
        }else{
            return "0";
        }
    }

    /**
     * 添加管理员
     * @param user
     * @return
     */
    @PostMapping("/admin/insertAdmin")
    public String insertAdmin(User user){
        if(user.getPassword() == ""){
            user.setPassword(StringUtil.MD5Encode("123456"));
        }else{
            user.setPassword(StringUtil.MD5Encode(user.getPassword()));
        }
        user.setRegTime(new Date());
        user.setRole(2);
        Integer is_insert = userService.insertAdmin(user);
        if(is_insert != null && is_insert > 0){
            return "1";
        }else {
            return "0";
        }
    }
    /**
     * 查看用户详情
     * @return
     */
    @RequestMapping("/admin/userDetail/{userId}")
    public ModelAndView toEditUser(@PathVariable Long userId){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("admin/edit_user");
        User user = userService.getUserById(userId);
        mv.addObject("user",user);
        return mv;
    }

    /**
     * 更新管理员信息
     * @param user
     * @return
     */
    @PostMapping("/admin/resetPassword")
    public String resetPassword(User user){
        user.setPassword(StringUtil.MD5Encode("123456"));
        user.setModifyTime(new Date());
        Integer is_update = userService.updateUserById(user);
        if(is_update != null && is_update > 0){
            return "1";
        }else {
            return "0";
        }
    }

}
