package com.shop.eshop.mapper;

import com.shop.eshop.model.GoodType;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoodTypeMapper {

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
    Integer deleteGoodType(List<Short> list);

    /**
     * 添加分类
     * @param goodType
     * @return
     */
    Integer insertGoodType(GoodType goodType);

    /**
     * 检查分类名是否已存在
     * @param goodType
     * @return
     */
    Integer checkTypeName(GoodType goodType);

    /**
     * 更新商品分类信息
     * @param goodType
     * @return
     */
    Integer updateGoodType(GoodType goodType);
}