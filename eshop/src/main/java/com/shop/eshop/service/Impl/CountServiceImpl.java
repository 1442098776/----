package com.shop.eshop.service.Impl;

import com.shop.eshop.dto.Count;
import com.shop.eshop.mapper.CountMapper;
import com.shop.eshop.service.CountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * create by zhanguo.huang on 2018.05.01
 */
@Service
public class CountServiceImpl implements CountService {
    @Autowired
    private CountMapper countMapper;
    /**
     * 订单统计
     * @return
     */
    @Override
    public Count orderCount() {
        return countMapper.orderCount();
    }

    /**
     * 用户统计
     * @return
     */
    @Override
    public Count userCount() {
        return countMapper.userCount();
    }

    /**
     * 商品统计
     * @return
     */
    @Override
    public Integer goodCount() {
        return countMapper.goodCount();
    }


    /**
     * 商品类型数
     * @return
     */
    @Override
    public Integer goodTypeCount() {
        return countMapper.goodTypeCount();
    }
}
