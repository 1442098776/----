package com.shop.eshop.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class Good {
    private Integer id;

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

    private String advise;

    /**
     * 活动
     */
    private Boolean activity;

    /**
     * 上下架
     */
    private String status;

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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public String getAdvise() {
        return advise;
    }

    public void setAdvise(String advise) {
        this.advise = advise;
    }

    public Boolean getActivity() {
        return activity;
    }

    public void setActivity(Boolean activity) {
        this.activity = activity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
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