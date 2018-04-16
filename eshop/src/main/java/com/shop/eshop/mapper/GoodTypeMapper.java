package com.shop.eshop.mapper;

import com.shop.eshop.model.GoodType;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GoodTypeMapper {

    List<GoodType> getGoodTypeByMenuId(Integer id);

    /**
     * 根据父级id获取类型列表
     * @param id
     * @return
     */
    List<GoodType> getGoodTypeByParentId(Integer id );

    int deleteByPrimaryKey(Short id);

    int insert(GoodType record);

    GoodType selectByPrimaryKey(Short id);

    int updateByPrimaryKey(GoodType record);
}