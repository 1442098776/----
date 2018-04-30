package com.shop.eshop.controller;

import com.shop.eshop.util.SendMessage;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class RegisterCode {

    @PostMapping("/register/code")
    public int getCode(String phone, HttpServletRequest request){
        SendMessage sendMessage = new SendMessage();
        int code = sendMessage.sendMessage(phone);
        request.getSession().setAttribute("code",code);
        request.getSession().setMaxInactiveInterval(1000*60*3);
        return code;
    }
}
