package com.shop.eshop.service.Impl;

import com.shop.eshop.dto.TypeCondition;
import com.shop.eshop.mapper.GoodMapper;
import com.shop.eshop.mapper.GoodTypeMapper;
import com.shop.eshop.model.Good;
import com.shop.eshop.model.GoodType;
import com.shop.eshop.service.GoodTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodTypeServiceImpl implements GoodTypeService {

    @Autowired
    private GoodTypeMapper goodTypeMapper;

    @Autowired
    private GoodMapper goodMapper;


    /**
     * 根据类型获取商品
     * @param tp
     * @return
     */
    @Override
    public List<Good> getGoodByCondition(TypeCondition tp) {
        return goodMapper.getGoodByCondition(tp);
    }

    /**
     * 根据父级id获取子集
     * @param id
     * @return
     */
    @Override
    public List<GoodType> getGoodTypeByParentId(Integer id) {
        return goodTypeMapper.getGoodTypeByParentId(id);
    }


    /**
     * 获取父类型下的所以商品
     * @param typeCondition
     * @return
     */
    @Override
    public List<Good> getAllSonGood(TypeCondition typeCondition) {
        return goodMapper.getAllSonGood(typeCondition);
    }

    /**
     * 删除分类
     * @param list
     * @return
     */
    @Override
    public Integer deleteGoodType(List<Short> list) {
        return goodTypeMapper.deleteGoodType(list);
    }

    /**
     * 添加商品分类
     * @param goodType
     * @return
     */
    @Override
    public Integer insertGoodType(GoodType goodType) {
        return goodTypeMapper.insertGoodType(goodType);
    }

    /**
     * 检查分类名
     * @param goodType
     * @return
     */
    @Override
    public Integer checkTypeName(GoodType goodType) {
        return goodTypeMapper.checkTypeName(goodType);
    }

    /**
     * 更新商品分类信息
     * @param goodType
     * @return
     */
    @Override
    public Integer updateGoodType(GoodType goodType) {
        return goodTypeMapper.updateGoodType(goodType);
    }


}
