package com.shop.eshop.controller;

import com.shop.eshop.dto.TypeCondition;
import com.shop.eshop.model.Good;
import com.shop.eshop.model.GoodType;
import com.shop.eshop.service.GoodTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * @author zhanguo.huang
 * @date 2018/03/18
 */
@Controller
public class SearchController {

    @Autowired
    private GoodTypeService goodTypeService;
    @GetMapping("/search/{menuId}")
    public ModelAndView searchByMenu(@PathVariable Integer menuId){
        ModelAndView mv = new ModelAndView();
        TypeCondition tp = new TypeCondition();
        tp.setMenuId(menuId);
        List<GoodType> goodTypeList = goodTypeService.getGoodTypeByMenuId(menuId);
        List<Good> goodList = goodTypeService.getGoodByCondition(tp);
        mv.addObject("goodTypeList",goodTypeList);
        mv.addObject("goodList",goodList);
        mv.setViewName("home/search");
        return mv;
    }
}
