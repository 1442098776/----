package com.shop.eshop.mapper;

import com.shop.eshop.dto.Count;
import org.springframework.stereotype.Repository;

/**
 * create by zhanguo.huang on 2018.05.01
 */
@Repository
public interface CountMapper {

    /**
     * 订单统计
     * @return
     */
    Count orderCount();
    /**
     * 用户统计
     * @return
     */
    Count userCount();
    /**
     * 商品统计
     * @return
     */
    Integer goodCount();

    /**
     * 商品类型数
     * @return
     */
    Integer goodTypeCount();
}
