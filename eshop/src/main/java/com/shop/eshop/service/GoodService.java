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


    /**
     * 更新商品信息
     * @param good
     * @return
     */
    Integer updateGood(Good good);

    /**
     * 添加商品
     * @param good
     * @return
     */
    Integer insertGood(Good good);

    /**
     * 根据id删除商品
     * @param id
     * @return
     */
    Integer deleteGoodById(Long id);

    /**
     * 根据类型删除商品
     * @param list
     * @return
     */
    Integer deleteGoodByType(List<Short> list);

    /**
     * 根据类型得到所有的商品id
     * @param list
     * @return
     */
    List<Long> getGoodByType(List<Short> list);
}
