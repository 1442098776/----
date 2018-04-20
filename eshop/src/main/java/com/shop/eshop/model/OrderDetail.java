package com.shop.eshop.model;


public class OrderDetail {
    /**
     * 订单号
     */
    private Long orderId;

    /**
     * 商品id
     */
    private Long goodId;

    /**
     * 商品购买数量
     */
    private Integer goodCount;

    /**
     * 商品的购买价格
     */
    private Float goodPrice;

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getGoodId() {
        return goodId;
    }

    public void setGoodId(Long goodId) {
        this.goodId = goodId;
    }

    public Integer getGoodCount() {
        return goodCount;
    }

    public void setGoodCount(Integer goodCount) {
        this.goodCount = goodCount;
    }

    public Float getGoodPrice() {
        return goodPrice;
    }

    public void setGoodPrice(Float goodPrice) {
        this.goodPrice = goodPrice;
    }
}