package com.shop.eshop.mapper;

import com.shop.eshop.model.Order;
import org.springframework.stereotype.Repository;

/**
 * 订单Mapper
 * @author zhanguo.huang
 * @date 2018-04-11
 */
@Repository
public interface OrderMapper {

    /**
     * 产生订单
     * @param order
     * @return
     */
    Integer createOrder(Order order);


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


    int deleteByPrimaryKey(Long orderId);

    int insert(Order record);

    int insertSelective(Order record);


    Order selectByPrimaryKey(Long orderId);



    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);
}