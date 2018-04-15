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
    @Override
    public Integer createOrder(Order order) {
        return orderMapper.createOrder(order);
    }

    @Override
    public Integer addOrderDetail(OrderDetail orderDetail) {
        return orderDetailMapper.addOrderDetail(orderDetail);
    }
}
