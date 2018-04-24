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

    /**
     * 添加订单明细
     * @param orderDetail
     * @return
     */
    Integer addOrderDetail(OrderDetail orderDetail);

    /**
     * 检查订单号是否已存在
     * @param orderId
     * @return
     */
    Integer checkOrderId(Long orderId);

    /**
     * 根据id获取订单
     * @param orderId
     * @return
     */
    Order getOrderById(Long orderId);
}
