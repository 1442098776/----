package com.shop.eshop.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ErrorConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //注册自定义拦截器，添加拦截路径和排除拦截路径
        //addPathPatterns 添加拦截规则
        //excludePathPatterns排除拦截规则
//        registry.addInterceptor(new MyInterceptor()).addPathPatterns("/**").excludePathPatterns("/","/search/**",
//                "/initGoodList","/sort","/searchGood","/province","/city","/area","/login",
//                "/register","/searchKeyWord/**","/secondmenu","/getGoodByType","/verity/**","/introduction/**","/checkLogin",
//                "/register2","/check","/login2","/exit","img/**","js/**","css/**",
//                "images/**","/assets/**","AmazeUI-2-4-2/**","basic/**","../img/**","../js/**","../css/**",
//                "../images/**","../assets/**","../AmazeUI-2-4-2/**","../basic/**");
//        registry.addInterceptor(new MyInterceptor()).addPathPatterns("/person/index").excludePathPatterns("/**");
        registry.addInterceptor(new ErrorInterceptor());//.addPathPatterns("/action/**", "/mine/**");默认所有
    }
}
