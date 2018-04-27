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

    /**
     * 商品搜索
     * @param keyWOrd
     * @return
     */
    @Override
    public List<Good> getGoodByKeyWord(String keyWOrd) {
        return goodMapper.getGoodByKeyWord(keyWOrd);
    }

    /**
     * 更新商品信息
     * @param good
     * @return
     */
    @Override
    public Integer updateGood(Good good) {
        return goodMapper.updateGood(good);
    }

    /**
     * 添加商品
     * @param good
     * @return
     */
    @Override
    public Integer insertGood(Good good) {
        return goodMapper.insertGood(good);
    }

    /**
     * 根据id删除商品
     * @param id
     * @return
     */
    @Override
    public Integer deleteGoodById(Long id) {
        return goodMapper.deleteGoodById(id);
    }

    /**
     * 根据类型删除商品
     * @param type
     * @return
     */
    @Override
    public Integer deleteGoodByType(Short type) {
        return goodMapper.deleteGoodByType(type);
    }
}
