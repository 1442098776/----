package com.shop.eshop.service.Impl;

import com.shop.eshop.dto.OrderStatus;
import com.shop.eshop.dto.OrderVo;
import com.shop.eshop.mapper.OrderManageMapper;
import com.shop.eshop.model.Order;
import com.shop.eshop.service.OrderManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author zhanguo.huang
 * @date 2018-04-19
 */

@Service
public class OrderManageServiceImpl implements OrderManageService {

    @Autowired
    private OrderManageMapper orderManageMapper;
    /**
     * 根据用户id获取所有的订单
     * @param userId
     * @return
     */
    @Override
    public List<OrderVo> getAllOrderByUserId(Long userId) {
        return orderManageMapper.getAllOrder(userId);
    }

    /**
     * 根据状态获取订单
     * @param orderStatus
     * @return
     */
    @Override
    public List<OrderVo> getOrderByStatus(OrderStatus orderStatus) {
        return orderManageMapper.getOrderByStatus(orderStatus);
    }

    @Override
    public Integer updateOrderStatus(OrderVo orderVo) {
        return orderManageMapper.updateOrderStatus(orderVo);
    }

    @Override
    public OrderVo getOrderByOrderId(OrderVo orderVo) {
        return orderManageMapper.getOrderByOrderId(orderVo);
    }


}
