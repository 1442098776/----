package com.shop.eshop.mapper;

import com.shop.eshop.model.GoodType;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GoodTypeMapper {

    List<GoodType> getGoodTypeByMenuId(Integer id);

    int deleteByPrimaryKey(Short id);

    int insert(GoodType record);

    GoodType selectByPrimaryKey(Short id);

    int updateByPrimaryKey(GoodType record);
}