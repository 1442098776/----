package com.shop.eshop.controller;

import com.shop.eshop.dto.Buy;
import com.shop.eshop.model.Address;
import com.shop.eshop.model.CartVO;
import com.shop.eshop.model.Good;
import com.shop.eshop.model.User;
import com.shop.eshop.service.AddressService;
import com.shop.eshop.service.CartService;
import com.shop.eshop.service.GoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * @author zhanguo.huang
 * @date 2018/03/25
 * 结算页面controller
 */
@RestController
public class PayController {

    @Autowired
    private GoodService goodService;
    @Autowired
    private AddressService addressService;
    @Autowired
    private CartService cartService;

    /**
     * 立即购买
     * @param buy
     * @param request
     * @param response
     * @return
     */
    @PostMapping("/buy")
    public String buy(Buy buy, HttpServletRequest request, HttpServletResponse response){
        //获取用户
        User user = (User) request.getSession().getAttribute("user");
        if(user != null){
            //用户已登录，并把购买商品信息保存
            request.getSession().setAttribute("buy",buy);
            return "1";
        }else{
            //用户没登录
            return "0";
        }
    }

    /**
     * 立即购买的计算
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/pay")
    public ModelAndView pay(HttpServletRequest request,HttpServletResponse response){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("home/pay");
        //获取购买商品的信息
        Buy buy = (Buy) request.getSession().getAttribute("buy");
        Good good = goodService.getGoodById(buy.getGoodId());
        //获取用户
        User user = (User) request.getSession().getAttribute("user");
        List<Address> addressList  = addressService.getAllAddressByUserId(user.getUserId());
        mv.addObject("addressList",addressList);
        mv.addObject("good",good);
        mv.addObject("buy",buy);
        return mv;
    }

    /**
     * 购物车结算
     * @param request
     * @param response
     * @param id
     * @return
     */
    @RequestMapping("/cartpay")
    public ModelAndView cartpay(HttpServletRequest request,HttpServletResponse response,String id){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("home/pay");
        String[] ids = id.split(",");
        List<Long> cartId = new ArrayList<>();
        for(int i = 0;i < ids.length;i++){
            cartId.add(Long.parseLong(ids[i]));
        }
        List<CartVO> cartVOList = cartService.getCartSelect(cartId);
        //获取用户
        User user = (User) request.getSession().getAttribute("user");
        List<Address> addressList  = addressService.getAllAddressByUserId(user.getUserId());
        mv.addObject("addressList",addressList);
        mv.addObject("cartList",cartVOList);
        return mv;
    }
}
