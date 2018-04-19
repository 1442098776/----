package com.shop.eshop.dto;

import com.shop.eshop.model.Good;
/**
 * @author zhanguo.huang
 * @date 2018-04-19
 */
public class OrderDetailVo {
    /**
     * 订单号
     */
    private Long orderId;

    /**
     * 商品
     */
    private Good good;

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

    public Good getGood() {
        return good;
    }

    public void setGood(Good good) {
        this.good = good;
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
