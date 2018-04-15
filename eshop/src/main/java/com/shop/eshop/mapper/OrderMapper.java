package com.shop.eshop.mapper;

import com.shop.eshop.model.Order;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 订单Mapper
 * @author zhanguo.huang
 * @date 2018-04-11
 */
@Mapper
public interface OrderMapper {

    /**
     * 产生订单
     * @param order
     * @return
     */
    Integer createOrder(Order order);






    int deleteByPrimaryKey(Long orderId);

    int insert(Order record);

    int insertSelective(Order record);


    Order selectByPrimaryKey(Long orderId);



    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);
}