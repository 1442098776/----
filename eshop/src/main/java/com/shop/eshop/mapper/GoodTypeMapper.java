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

    /**
     * 首页
     * @param id
     * @return
     */
    List<GoodType> indexGoodTypeByParentId(Integer id );

    /**
     * 删除分类
     * @param list
     * @return
     */
    Integer deleteGoodType(List<Long> list);

    /**
     * 获取所有的非一级类型
     * @return
     */
    List<GoodType> getAllSonType();
}