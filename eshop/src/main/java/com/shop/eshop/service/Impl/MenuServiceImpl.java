package com.shop.eshop.service.Impl;

import com.shop.eshop.mapper.MenuMapper;
import com.shop.eshop.model.Menu;
import com.shop.eshop.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuMapper menuMapper;

    @Override
    public List<Menu> getMenuByParentId(Integer id) {
        return menuMapper.getMenuByParentId(id);
    }
}
