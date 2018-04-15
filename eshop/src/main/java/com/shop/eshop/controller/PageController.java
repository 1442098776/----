package com.shop.eshop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author zhanguo.huang
 * @data 2018-3-18
 * 主要用在页面的跳转
 */

@Controller
public class PageController {

//    @RequestMapping("/{page}")
//    public String pageController(@PathVariable String page){
//        return "home/"+page;
//    }
    @RequestMapping("/login")
    public String login(){
        return "login";
    }
    @RequestMapping("/register")
    public String register(){
        return "register";
    }
    @RequestMapping("/success")
    public String paySuccess(){
        return "home/success";
    }
    @RequestMapping("/person/{pageName}")
    public String personPage(@PathVariable String pageName){
        return "person/"+pageName;
    }
}
