package com.shop.eshop.controller;

import com.shop.eshop.model.Menu;
import com.shop.eshop.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * 菜单的显示
 * @author zhanguo.huang
 * @date 2018/03/10
 */
@Controller
public class MenuController {

    @Autowired
    private MenuService menuService;

    @RequestMapping ("/secondmenu")
    public List<Menu> secondMenu(Integer id){
        List<Menu> menuList=menuService.getMenuByParentId(id);
        return menuList;
    }
}
