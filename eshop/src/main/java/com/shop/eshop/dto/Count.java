package com.shop.eshop.dto;

public class Count {
    /**
     * 用户总数量
     */
    private Integer userNum;
    /**
     * 禁用用户
     */
    private Integer disableUser;
    /**
     * 启用用户
     */
    private Integer enableUser;

    private Integer commonUser;
    /**
     * 系统管理员
     */
    private Integer systemManager;
    /**
     * 商品总数量
     */
    private Integer goodNum;
    /**
     * 订单总数量
     */
    private Integer orderNum;
    /**
     * 商品类型数
     */
    private Integer goodTypeNum;
    /**
     * 待发货数
     */
    private Integer orderNewNum;
    /**
     * 已发货数量
     */
    private Integer orderSendNum;
    /**
     * 已完成数量
     */
    private Integer orderFinishNum;
    /**
     * 取消的订单数量
     */
    private Integer orderCancelNum;

    /**
     * 交易完成金额
     * @return
     */
    private Float dealFinish;
    /**
     * 交易为完成
     */
    private Float dealNoFinish;
    /**
     * 交易取消
     */
    private Float dealCancel;
    /**
     * 交易待确定
     */
    private Float dealSend;

    public Float getDealFinish() {
        return dealFinish;
    }

    public void setDealFinish(Float dealFinish) {
        this.dealFinish = dealFinish;
    }

    public Float getDealNoFinish() {
        return dealNoFinish;
    }

    public void setDealNoFinish(Float dealNoFinish) {
        this.dealNoFinish = dealNoFinish;
    }

    public Float getDealCancel() {
        return dealCancel;
    }

    public void setDealCancel(Float dealCancel) {
        this.dealCancel = dealCancel;
    }

    public Float getDealSend() {
        return dealSend;
    }

    public void setDealSend(Float dealSend) {
        this.dealSend = dealSend;
    }

    public Integer getGoodTypeNum() {
        return goodTypeNum;
    }

    public void setGoodTypeNum(Integer goodTypeNum) {
        this.goodTypeNum = goodTypeNum;
    }

    public Integer getOrderCancelNum() {
        return orderCancelNum;
    }

    public void setOrderCancelNum(Integer orderCancelNum) {
        this.orderCancelNum = orderCancelNum;
    }

    public Integer getUserNum() {
        return userNum;
    }

    public void setUserNum(Integer userNum) {
        this.userNum = userNum;
    }

    public Integer getDisableUser() {
        return disableUser;
    }

    public void setDisableUser(Integer disableUser) {
        this.disableUser = disableUser;
    }

    public Integer getEnableUser() {
        return enableUser;
    }

    public void setEnableUser(Integer enableUser) {
        this.enableUser = enableUser;
    }

    public Integer getCommonUser() {
        return commonUser;
    }

    public void setCommonUser(Integer commonUser) {
        this.commonUser = commonUser;
    }

    public Integer getSystemManager() {
        return systemManager;
    }

    public void setSystemManager(Integer systemManager) {
        this.systemManager = systemManager;
    }

    public Integer getGoodNum() {
        return goodNum;
    }

    public void setGoodNum(Integer goodNum) {
        this.goodNum = goodNum;
    }

    public Integer getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(Integer orderNum) {
        this.orderNum = orderNum;
    }

    public Integer getOrderNewNum() {
        return orderNewNum;
    }

    public void setOrderNewNum(Integer orderNewNum) {
        this.orderNewNum = orderNewNum;
    }

    public Integer getOrderSendNum() {
        return orderSendNum;
    }

    public void setOrderSendNum(Integer orderSendNum) {
        this.orderSendNum = orderSendNum;
    }

    public Integer getOrderFinishNum() {
        return orderFinishNum;
    }

    public void setOrderFinishNum(Integer orderFinishNum) {
        this.orderFinishNum = orderFinishNum;
    }
}
