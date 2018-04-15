package com.shop.eshop.service;

import com.shop.eshop.model.Order;
import com.shop.eshop.model.OrderDetail;

/**
 * @author zhanguo.huang
 * @date 2018-04-11
 */
public interface OrderService {

    /**
     * 产生订单
     * @param order
     * @return
     */
    Integer createOrder(Order order);

    Integer addOrderDetail(OrderDetail orderDetail);
}
