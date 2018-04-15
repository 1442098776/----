package com.shop.eshop.service.Impl;

import com.shop.eshop.dto.TypeCondition;
import com.shop.eshop.mapper.GoodMapper;
import com.shop.eshop.model.Good;
import com.shop.eshop.service.GoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class GoodServiceImpl implements GoodService {

    @Autowired
    private GoodMapper goodMapper;

    /**
     * 获取所以的商品
     * @return
     */
    @Override
    public List<Good> getAllGood() {
        return goodMapper.getAllGood();
    }

    /**
     * 根据商品id获取该商品
     * @param id
     * @return
     */
    @Override
    public Good getGoodById(Long id) {
        return goodMapper.getGoodById(id);
    }

    /**
     * 根据销量获取商品详细
     * @return
     */
    @Override
    public List<Good> getGoodBySaleNum() {
        return goodMapper.getGoodBySaleNum();
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
}
