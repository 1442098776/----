package com.shop.eshop.service;

import com.shop.eshop.dto.OrderStatus;
import com.shop.eshop.dto.OrderVo;
import com.shop.eshop.model.Order;

import java.util.List;

/**
 * @author zhanguo.huang
 * @date 2018-04-19
 */
public interface OrderManageService {

    /**
     * 根据用户id获取所有的订单
     * @param userId
     * @return
     */
    List<OrderVo> getAllOrderByUserId(Long userId);

    /**
     * 根据状态获取订单
     * @param orderStatus
     * @return
     */
    List<OrderVo> getOrderByStatus(OrderStatus orderStatus);

    /**
     * 修改订单状态
     * @param orderVo
     * @return
     */
    Integer updateOrderStatus(OrderVo orderVo);

    /**
     * 根据id获取order
     * @param orderVo
     * @return
     */
    OrderVo getOrderByOrderId(OrderVo orderVo);
}
