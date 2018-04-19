package com.shop.eshop.dto;

import java.util.List;

public class OrderManage {

    private OrderVo orderVo;
    private List<OrderDetailVo> orderDetailVoList;

    public OrderVo getOrderVo() {
        return orderVo;
    }

    public void setOrderVo(OrderVo orderVo) {
        this.orderVo = orderVo;
    }

    public List<OrderDetailVo> getOrderDetailVoList() {
        return orderDetailVoList;
    }

    public void setOrderDetailVoList(List<OrderDetailVo> orderDetailVoList) {
        this.orderDetailVoList = orderDetailVoList;
    }
}
