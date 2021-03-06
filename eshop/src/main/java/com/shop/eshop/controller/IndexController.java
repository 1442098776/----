package com.shop.eshop.controller;

import com.shop.eshop.dto.TypeCondition;
import com.shop.eshop.model.Good;
import com.shop.eshop.model.GoodType;
import com.shop.eshop.model.User;
import com.shop.eshop.service.CartService;
import com.shop.eshop.service.GoodService;
import com.shop.eshop.service.GoodTypeService;
import com.shop.eshop.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

    @Autowired
    private CartService cartService;

    @Autowired
    private GoodTypeService goodTypeService;

    /**
     * 加载首页数据
     * @param request
     * @param response
     * @return
     */
//    @RequestMapping("/")
//    public ModelAndView index(HttpServletRequest request, HttpServletResponse response){
//        ModelAndView mv = new ModelAndView();
//        List<Menu> menuList=menuService.getMenuByParentId(0);
//        //获取用户登录的user
//        User user = (User) request.getSession().getAttribute("user");
//        Integer cartCount = cartService.getCountByUserId(user);
//        List<Good> goods=goodService.getAllGood();
//        List<Good> goodList=new ArrayList<Good>();
//        for(Good good:goods){
//            String googsub=good.getName().substring(0,14);
//            good.setName(googsub);
//            goodList.add(good);
//        }
//        mv.addObject("user",user);
//        mv.addObject("menuList",menuList);
//        mv.addObject("goodList",goodList);
//        mv.addObject("cartCount",cartCount);
//        mv.setViewName("home/index2");
//        return mv;
//    }


    /**
     * 加载首页数据
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("/")
    public ModelAndView index2(HttpServletRequest request, HttpServletResponse response){
        ModelAndView mv = new ModelAndView();
        List<GoodType> goodTypeList = goodTypeService.getGoodTypeByParentId(0);
        List<GoodType> goodTypeList2 = new ArrayList<>();
        for (GoodType goodType:goodTypeList){
            List list = new ArrayList<>();
            TypeCondition typeCondition = new TypeCondition();
            list.add(goodType.getId());
            for(GoodType goodType1:goodType.getGoodTypes()){
                list.add(goodType1.getId());
            }
            typeCondition.setList(list);
            List<Good> goodList = goodTypeService.getAllSonGood(typeCondition);
            goodType.setGood(goodList);
            goodTypeList2.add(goodType);
        }
        //获取用户登录的user
        User user = (User) request.getSession().getAttribute("user");
        Integer cartCount = cartService.getCountByUserId(user);
//        List<Good> goods=goodService.getAllGood();
//        List<Good> goodList=new ArrayList<Good>();
//        for(Good good:goods){
//            String googsub=good.getName().substring(0,14);
//            good.setName(googsub);
//            goodList.add(good);
//        }
//        mv.addObject("user",user);
        mv.addObject("goodTypeList",goodTypeList2);
//        mv.addObject("goodList",goodList);
        mv.addObject("cartCount",cartCount);
        mv.setViewName("home/index");
        return mv;
    }

    /**
     * 根据商品类型获取商品
     * @param type
     * @return
     */
    @RequestMapping("/getGoodByType")
    @ResponseBody
    public List<Good> getGoodByType(TypeCondition type){
        List<Good> goodList = goodService.getGoodByCondition(type);
        return goodList;
    }
}
