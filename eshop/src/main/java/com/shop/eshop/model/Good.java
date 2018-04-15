package com.shop.eshop.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class Good {
    private Long id;

    /**
     * 名称
     */
    private String name;

    /**
     * 类型
     */
    private Short type;

    /**
     * 原价格
     */
    private BigDecimal price;

    /**
     * 销售价格
     */
    private BigDecimal salePrice;

    /**
     * 库存
     */
    private Integer stock;

    /**
     * 销量
     */
    private Integer saleNum;

    private Integer advise;

    /**
     * 活动
     */
    private Integer activity;

    /**
     * 上下架
     */
    private Integer status;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 活动开始时间
     */
    private Date startTime;

    /**
     * 活动结束时间
     */
    private Date endTime;

    /**
     * 商品图片
     */
    private List<GoodPic> goodPics;

    public List<GoodPic> getGoodPics() {
        return goodPics;
    }

    public void setGoodPics(List<GoodPic> goodPics) {
        this.goodPics = goodPics;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Short getType() {
        return type;
    }

    public void setType(Short type) {
        this.type = type;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(BigDecimal salePrice) {
        this.salePrice = salePrice;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Integer getSaleNum() {
        return saleNum;
    }

    public void setSaleNum(Integer saleNum) {
        this.saleNum = saleNum;
    }

    public Integer getAdvise() {
        return advise;
    }

    public void setAdvise(Integer advise) {
        this.advise = advise;
    }

    public Integer getActivity() {
        return activity;
    }

    public void setActivity(Integer activity) {
        this.activity = activity;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }
}