package com.shop.eshop.model;

import java.util.Date;

public class Order {
    /**
     * 订单号
     */
    private Long id;
    /**
     * 订单号
     */
    private Long orderId;

    /**
     * 用户id
     */
    private Long userId;
//    /**
//     * 商品id
//     */
//    private Long goodId;
    /**
     * 收货地址
     */
    private Long receiveAddress;
    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 发货时间
     */
    private Date sendTime;

    /**
     * 收货时间
     */
    private Date receiveTime;
    /**
     * 订单状态
     */
    private Integer state;

    /**
     * 留言
     */
    private String message;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

//    public Long getGoodId() {
//        return goodId;
//    }
//
//    public void setGoodId(Long goodId) {
//        this.goodId = goodId;
//    }

    public Long getReceiveAddress() {
        return receiveAddress;
    }

    public void setReceiveAddress(Long receiveAddress) {
        this.receiveAddress = receiveAddress;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getSendTime() {
        return sendTime;
    }

    public void setSendTime(Date sendTime) {
        this.sendTime = sendTime;
    }

    public Date getReceiveTime() {
        return receiveTime;
    }

    public void setReceiveTime(Date receiveTime) {
        this.receiveTime = receiveTime;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}