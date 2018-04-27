package com.shop.eshop.service;

import com.shop.eshop.dto.TypeCondition;
import com.shop.eshop.model.Good;
import com.shop.eshop.model.GoodType;

import java.util.List;

public interface GoodTypeService {

    List<Good> getGoodByCondition(TypeCondition tp);

    /**
     * 根据父级id获取类型列表
     * @param id
     * @return
     */
    List<GoodType> getGoodTypeByParentId(Integer id);


    /**
     * 获取自己及子类所有商品
     * @param typeCondition
     * @return
     */
    List<Good> getAllSonGood(TypeCondition typeCondition);

    /**
     * 删除分类
     * @param list
     * @return
     */
    Integer deleteGoodType(List<Long> list);

    /**
     * 添加商品分类
     * @param goodType
     * @return
     */
    Integer insertGoodType(GoodType goodType);
}
