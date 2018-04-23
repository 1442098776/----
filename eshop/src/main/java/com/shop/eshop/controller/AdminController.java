package com.shop.eshop.controller;

import com.shop.eshop.model.User;
import com.shop.eshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

/**
 * @author zhanguo.huang
 * @date 2018-04-23
 */
@RestController
public class AdminController {

    @Autowired
    private UserService userService;

    /**
     * 管理员登录
     * @param user
     * @param request
     * @return
     */
    @PostMapping("/admin/adminLogin")
    public String adminLogin(User user, HttpServletRequest request){
        User user1 = userService.userLogin(user);

        if(user1 == null || !user1.getStatus()){
            return "1";//账号错误
        }else if (user.getPassword() == user1.getPassword() || user.getPassword().equals(user1.getPassword())) {
            if(user1.getRole() != 1){
                //登录成功，并保存到session中
                request.getSession().setAttribute("adminUser", user1);
                //设置保存一天
                request.getSession().setMaxInactiveInterval(1000*60*60*24);
                return "2";//登录成功
            }else{
                return "3";//没有权限登录管理系统
            }
        } else {
            return "0";//密码错误
        }
    }

    /**
     * 管理员退出登录
     * @param request
     * @return
     */
    @PostMapping("/admin/adminExit")
    public ModelAndView adminExit(HttpServletRequest request){
        request.getSession().invalidate();
        ModelAndView mv = new ModelAndView();
        mv.setViewName("admin");
        return mv;
    }

    /**
     * 修改用户密码
     * @param oldPassword
     * @param newPassword
     * @param request
     * @return
     */
    @PostMapping("/admin/updatePassword")
    public String updatePassword(String oldPassword,String newPassword,HttpServletRequest request){
        User user = (User) request.getSession().getAttribute("adminUser");
        if(user.getPassword() != null && oldPassword.equals(user.getPassword())){
            user.setPassword(newPassword);
            user.setModifyTime(new Date());
            Integer is_update = userService.updateUserById(user);
            if(is_update != null && is_update > 0){
                return "1";
            }else{
                return "0";
            }
        }else{
            return "2";
        }
    }
}
