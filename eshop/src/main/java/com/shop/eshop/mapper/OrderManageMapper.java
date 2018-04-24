package com.shop.eshop.mapper;

import com.shop.eshop.dto.OrderStatus;
import com.shop.eshop.dto.OrderVo;
import com.shop.eshop.model.Order;
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

    /**
     * 根据不同状态获取订单
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
     * 根据id获取信息
     * @param orderVo
     * @return
     */
    OrderVo getOrderByOrderId(OrderVo orderVo);

    /**
     * 管理员获取所有的订单
     * @return
     */
    List<OrderVo> getAllOrderByAdmin(Order order);
}
