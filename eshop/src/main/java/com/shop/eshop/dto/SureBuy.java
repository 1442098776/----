package com.shop.eshop.dto;

import com.shop.eshop.model.Address;

/**
 * 订单的商品id，数量，价格封装
 * @author zhanguo.huang
 * @date 2018-04-11
 */
public class SureBuy {
    /**
     * 商品id
     */
    private String goodIds;
    /**
     * 商品数量
     */
    private String goodCounts;
    /**
     * 商品价格
     */
    private String goodPrices;

    /**
     * 留言信息
     */
    private String message;

    /**
     * 收货地址
     */
    private Long receiveAddress;

    /**
     * 总金额
     */
    private Float sum;

    /**
     * 收货地址
     */
    private Address address;

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Long getReceiveAddress() {
        return receiveAddress;
    }

    public void setReceiveAddress(Long receiveAddress) {
        this.receiveAddress = receiveAddress;
    }

    public String getGoodIds() {
        return goodIds;
    }

    public void setGoodIds(String goodIds) {
        this.goodIds = goodIds;
    }

    public String getGoodCounts() {
        return goodCounts;
    }

    public void setGoodCounts(String goodCounts) {
        this.goodCounts = goodCounts;
    }

    public String getGoodPrices() {
        return goodPrices;
    }

    public void setGoodPrices(String goodPrices) {
        this.goodPrices = goodPrices;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Float getSum() {
        return sum;
    }

    public void setSum(Float sum) {
        this.sum = sum;
    }
}
