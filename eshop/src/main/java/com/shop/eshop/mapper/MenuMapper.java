package com.shop.eshop.mapper;

import com.shop.eshop.model.Menu;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MenuMapper {
    List<Menu> getMenuByParentId(Integer id);
}
