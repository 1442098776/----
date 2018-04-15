package com.shop.eshop.controller;

import com.shop.eshop.model.Cart;
import com.shop.eshop.model.CartVO;
import com.shop.eshop.model.User;
import com.shop.eshop.service.CartService;
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
 * @date 2018/3/24
 */
@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    /**
     * 跳转到购物车页面并准备数据
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/shopcart")
    public ModelAndView shopcart(HttpServletRequest request,HttpServletResponse response){
        User user = (User) request.getSession().getAttribute("user");
        List<CartVO> cartList = cartService.getAllCartByUserId(user);
        ModelAndView mv = new ModelAndView();
        mv.setViewName("home/cart");
        mv.addObject("cartList",cartList);
        return mv;
    }

    /**
     * 添加购物车
     * @param cart
     * @param request
     * @param response
     * @return  返回状态
     */
    @PostMapping("/addCart")
    public String addCart(Cart cart,HttpServletRequest request,HttpServletResponse response){

        User user = (User) request.getSession().getAttribute("user");
        cart.setUserId(user.getUserId());
        cart.setCreateTime(new Date());
        Cart checkCart = cartService.checkCart(cart);
        Integer row = null;
        if(checkCart != null){
            cart.setCount(cart.getCount()+checkCart.getCount());
            cart.setId(checkCart.getId());
            row = cartService.updateCart(cart);
        }else {
            row = cartService.addGoodToCart(cart);
        }
        if(row != null && row > 0){
            return "1";//添加或更新购物车成功
        }else{
            return "0";//添加或更新失败
        }

    }

    /**
     * 获取购物车条数
     * @param request
     * @param response
     * @return
     */
    @PostMapping("/cartCount")
    private Integer cartCount(HttpServletRequest request, HttpServletResponse response){
        User user = (User) request.getSession().getAttribute("user");
        if(user != null){
            return cartService.getCountByUserId(user);
        }else {
            return 0;
        }
    }
}
