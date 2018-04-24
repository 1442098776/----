package com.shop.eshop.service.Impl;

import com.shop.eshop.mapper.OrderDetailMapper;
import com.shop.eshop.mapper.OrderMapper;
import com.shop.eshop.model.Order;
import com.shop.eshop.model.OrderDetail;
import com.shop.eshop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 订单Service
 * @author zhanguo.huang
 * @date 2018-04-11
 */
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private OrderDetailMapper orderDetailMapper;

    /**
     * 创建订单
     * @param order
     * @return
     */
    @Override
    public Integer createOrder(Order order) {
        return orderMapper.createOrder(order);
    }

    /**
     * 添加订单明细
     * @param orderDetail
     * @return
     */
    @Override
    public Integer addOrderDetail(OrderDetail orderDetail) {
        return orderDetailMapper.addOrderDetail(orderDetail);
    }

    /**
     * 检查订单号是否已存在
     * @param orderId
     * @return
     */
    @Override
    public Integer checkOrderId(Long orderId) {
        return orderMapper.checkOrderId(orderId);
    }

    /**
     * 根据id获取订单
     * @param orderId
     * @return
     */
    @Override
    public Order getOrderById(Long orderId) {
        return orderMapper.getOrderById(orderId);
    }
}
