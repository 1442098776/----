package com.shop.eshop.mapper;

import com.shop.eshop.model.OrderDetail;
import org.springframework.stereotype.Repository;

/**
 * @author zhanguo.huang
 * @date 2018-04-11
 */
@Repository
public interface OrderDetailMapper {

    /**
     * 添加订单详情
     * @param orderDetail
     * @return
     */
    Integer addOrderDetail(OrderDetail orderDetail);
}