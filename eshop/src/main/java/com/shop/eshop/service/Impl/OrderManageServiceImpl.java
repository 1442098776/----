package com.shop.eshop.service.Impl;

import com.shop.eshop.dto.OrderManage;
import com.shop.eshop.dto.OrderVo;
import com.shop.eshop.mapper.OrderManageMapper;
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
    @Override
    public List<OrderVo> getAllOrderByUserId(Long userId) {
        return orderManageMapper.getAllOrder(userId);
    }
}
