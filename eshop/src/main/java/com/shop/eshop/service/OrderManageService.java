package com.shop.eshop.service;

import com.shop.eshop.dto.OrderVo;

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
}
