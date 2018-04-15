package com.shop.eshop.controller;

import com.shop.eshop.model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author zhanguo.huang
 * @date 2018/3/20
 */
@RestController
public class CommonController {

    /**
     * 检查是否已经登录
     * @param response
     * @param request
     * @return
     */
    @PostMapping("/checkLogin")
    public String checkLogin(HttpServletResponse response, HttpServletRequest request){
        User user = (User) request.getSession().getAttribute("user");
        if(user != null){
            return "1";
        }else {
            return "0";
        }
    }
}
