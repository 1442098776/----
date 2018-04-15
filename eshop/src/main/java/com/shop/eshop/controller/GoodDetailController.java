package com.shop.eshop.controller;

import com.shop.eshop.model.Good;
import com.shop.eshop.service.GoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * 商品详细信息controller
 * @author zhanguo.huang
 * @date 2018/3/15
 */
@Controller
public class GoodDetailController {

    @Autowired
    private GoodService goodService;

    /**
     * 根据商品id获取商品的详细信息，并跳转
     * @param id
     * @return
     */
    @RequestMapping("/introduction/{id}")
    public ModelAndView goodDetail(@PathVariable() Long id){

        ModelAndView mv = new ModelAndView();
        mv.setViewName("home/introduction");
        Good good = goodService.getGoodById(id);
        List<Good> goodList = goodService.getGoodBySaleNum();
        mv.addObject("good",good);
        mv.addObject("goodList",goodList);
        return mv;
    }
}
