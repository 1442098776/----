package com.shop.eshop.mapper;

import com.shop.eshop.dto.TypeCondition;
import com.shop.eshop.model.Good;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoodMapper {

    /**
     * 根据条件获取商品
     * @param tp
     * @return
     */
    List<Good> getGoodByCondition(TypeCondition tp);

    /**
     * 得到所有商品
     * @return
     */
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
     * 根据一个父类获取所有子类的商品
     * @param typeCondition
     * @return
     */
    List<Good> getAllSonGood(TypeCondition typeCondition);

    /**
     * 根据类型获取商品
     * @param id
     * @return
     */
    List<Long> getGoodByType(List<Short> id);

    /**
     * 搜索商品
     * @param keyWord
     * @return
     */
    List<Good> getGoodByKeyWord(String keyWord);

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
     * 根据商品id删除商品
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
}
