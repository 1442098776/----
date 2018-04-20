package com.shop.eshop.dto;

public class OrderStatus {
    /**
     * 用户id
     */
    private Long userId;
    /**
     * 订单状态
     */
    private Integer status;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
