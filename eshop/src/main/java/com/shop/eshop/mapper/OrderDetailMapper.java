package com.shop.eshop.mapper;

import com.shop.eshop.model.OrderDetail;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author zhanguo.huang
 * @date 2018-04-11
 */
@Mapper
public interface OrderDetailMapper {

    /**
     * 添加订单详情
     * @param orderDetail
     * @return
     */
    Integer addOrderDetail(OrderDetail orderDetail);
}