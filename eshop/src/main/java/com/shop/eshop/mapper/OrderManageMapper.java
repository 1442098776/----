package com.shop.eshop.mapper;

import com.shop.eshop.dto.OrderVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author zhanguo.huang
 * @date 2018-04-19
 */
@Mapper
public interface OrderManageMapper {

    /**
     * 根据用户id获取所有订单
     * @param userId
     * @return
     */
    List<OrderVo> getAllOrder(Long userId);
}
