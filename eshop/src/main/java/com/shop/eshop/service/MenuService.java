package com.shop.eshop.service;

import com.shop.eshop.model.Menu;

import java.util.List;

public interface MenuService {

    List<Menu> getMenuByParentId(Integer id);
}
