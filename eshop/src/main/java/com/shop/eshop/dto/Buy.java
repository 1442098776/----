package com.shop.eshop.dto;

import java.math.BigDecimal;

public class Buy {

    /**
     * 商品id
     */
    private Long goodId;
    /**
     * 价格
     */
    private BigDecimal price;

    /**
     * 运费
     */
    private Double freight;

    /**
     * 数量
     */
    private Integer num;

    @Override
    public String toString() {
        return "Buy{" +
                "goodId=" + goodId +
                ", price=" + price +
                ", freight=" + freight +
                ", num=" + num +
                '}';
    }

    public Long getGoodId() {
        return goodId;
    }

    public void setGoodId(Long goodId) {
        this.goodId = goodId;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Double getFreight() {
        return freight;
    }

    public void setFreight(Double freight) {
        this.freight = freight;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }
}
