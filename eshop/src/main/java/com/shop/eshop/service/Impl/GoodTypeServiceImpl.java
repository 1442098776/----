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
     * 根据菜单id获取商品类型
     * @param id
     * @return
     */
    @Override
    public List<GoodType> getGoodTypeByMenuId(Integer id) {
        return goodTypeMapper.getGoodTypeByMenuId(id);
    }

    /**
     * 根据类型获取商品
     * @param tp
     * @return
     */
    @Override
    public List<Good> getGoodByCondition(TypeCondition tp) {
        return goodMapper.getGoodByCondition(tp);
    }

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
}
