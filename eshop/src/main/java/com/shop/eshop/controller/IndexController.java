package com.shop.eshop.controller;

import com.shop.eshop.model.Good;
import com.shop.eshop.model.Menu;
import com.shop.eshop.service.GoodService;
import com.shop.eshop.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zhanguo.huang
 * @date 2018-03-18
 * 用于主页加载菜单和商品的展示
 */

@Controller
public class IndexController {

    @Autowired
    private MenuService menuService;
    @Autowired
    private GoodService goodService;
    @RequestMapping("/")
    public ModelAndView index(){
        ModelAndView mv = new ModelAndView();
        List<Menu> menuList=menuService.getMenuByParentId(0);
        List<Good> goods=goodService.getAllGood();
        List<Good> goodList=new ArrayList<Good>();
        for(Good good:goods){
            String googsub=good.getName().substring(0,14);
            good.setName(googsub);
            goodList.add(good);
        }
        mv.addObject("menuList",menuList);
        mv.addObject("goodList",goodList);
        mv.setViewName("index");
        return mv;
    }
}
