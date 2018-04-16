package com.shop.eshop.controller;

import com.shop.eshop.dto.TypeCondition;
import com.shop.eshop.model.Good;
import com.shop.eshop.model.GoodType;
import com.shop.eshop.service.GoodTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zhanguo.huang
 * @date 2018/03/18
 */
@Controller
public class SearchController {

    @Autowired
    private GoodTypeService goodTypeService;
    @GetMapping("/search/{typeId}")
    public ModelAndView searchByMenu(@PathVariable Integer typeId,Integer type){
        ModelAndView mv = new ModelAndView();
        TypeCondition tp = new TypeCondition();
        List list = new ArrayList();
        list.add(typeId);
        List<GoodType> goodTypeList = goodTypeService.getGoodTypeByParentId(typeId);
        if(goodTypeList != null){
            for(GoodType goodType:goodTypeList){
                list.add(goodType.getId());
            }
        }
        tp.setList(list);
        tp.setType(type);
        List<Good> goodList = goodTypeService.getAllSonGood(tp);
        mv.addObject("goodTypeList",goodTypeList);
        mv.addObject("goodList",goodList);
        mv.addObject("typeId",typeId);
        mv.setViewName("home/search");
        return mv;
    }

    /**
     * 排序：综合、销量、价格
     * @param typeId
     * @param type
     * @return
     */
    @PostMapping("/sort")
    @ResponseBody
    public List<Good> sortGood(Integer typeId,Integer type){
        TypeCondition tp = new TypeCondition();
        List list = new ArrayList();
        list.add(typeId);
        List<GoodType> goodTypeList = goodTypeService.getGoodTypeByParentId(typeId);
        if(goodTypeList != null){
            for(GoodType goodType:goodTypeList){
                list.add(goodType.getId());
            }
        }
        tp.setList(list);
        tp.setType(type);
        List<Good> goodList = goodTypeService.getAllSonGood(tp);
        return goodList;
    }
}
