package com.shop.eshop.service;

import com.shop.eshop.dto.TypeCondition;
import com.shop.eshop.model.Good;

import java.util.List;

public interface GoodService {
    List<Good> getAllGood();

    /**
     * 根据id获取商品
     * @param id
     * @return
     */
    Good getGoodById(Long id);

    /**
     * 根据销量获取商品
     * @return
     */
    List<Good> getGoodBySaleNum();

    /**
     * 根据TypeCondition封装的条件获取商品
     * @param tp
     * @return
     */
    List<Good> getGoodByCondition(TypeCondition tp);

    /**
     * 搜索商品
     * @param keyWOrd
     * @return
     */
    List<Good> getGoodByKeyWord(String keyWOrd);
}
