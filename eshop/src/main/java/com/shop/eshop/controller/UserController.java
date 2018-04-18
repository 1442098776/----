package com.shop.eshop.controller;

import com.shop.eshop.model.User;
import com.shop.eshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

/**
 * @author zhanguo.huang
 * @date 2018/03/02
 * 用户登录注册
 */
@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @PostMapping("/register2")
    public String register(User user){
        user.setRegTime(new Date());
        int row=userService.registerUser(user);
        if(row > 0){
            return "1";
        }else {
            return "0";
        }
    }

    /**
     * 检查唯一性
     * @param user
     * @return
     */
    @PostMapping("/check")
    public String check(User user){

        List<User> userList = userService.checkUser(user);
        if(userList.size() == 0){
            return "1";//手机没注册
        }else{
            return "0";//已注册
        }
    }

    /**
     * 用户登录验证
     * @param user
     * @param response
     * @param request
     * @return
     */
    @PostMapping("/login2")
    public String userLogin(User user, HttpServletResponse response, HttpServletRequest request){
        User user1 = userService.userLogin(user);

        if(user1 == null || !user1.getStatus()){
            return "1";//账号错误
        }else if (user.getPassword() == user1.getPassword() || user.getPassword().equals(user1.getPassword())) {
            //登录成功，并保存到session中
            request.getSession().setAttribute("user", user1);
            //设置保存一天
            request.getSession().setMaxInactiveInterval(1000*60*60*24);
            return "2";//登录成功
        } else {
            return "0";//密码错误
        }

    }

    /**
     * 用户退出
     * @param response
     * @param request
     * @return
     */
    @PostMapping ("/exit")
    public String exit(HttpServletResponse response, HttpServletRequest request){
        request.getSession().invalidate();
        return "1";
    }

    /**
     * 更新用户信息
     * @param user
     * @param newPassword
     * @param request
     * @return
     */
    @PostMapping("/updateUser")
    public String updateUserBuId(User user,String newPassword,HttpServletRequest request){
        User loginUser = (User) request.getSession().getAttribute("user");
        if(!loginUser.getPassword().equals(user.getPassword())){
            return "2";
        }else{
            if(user.getEmail()!= null){
                loginUser.setEmail(user.getEmail());
            }else if(user.getRealName() != null){
                loginUser.setRealName(user.getRealName());
            }else if(user.getPassword() != null){
                loginUser.setPassword(newPassword);
            }
            loginUser.setModifyTime(new Date());
            Integer is_update = userService.updateUserById(loginUser);
            if(is_update != null && is_update > 0){
                return "1";
            }else{
                return "0";
            }
        }
    }


}
