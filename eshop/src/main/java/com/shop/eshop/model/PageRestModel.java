package com.shop.eshop.model;

import java.io.Serializable;

/**
 * @Author : zhanguo.huzng
 * @Date : Create in 15:12 2018/3/28
 */
public class PageRestModel implements Serializable {
    public PageRestModel() {
    }

    private String draw;//表示请求次数

    private Long recordsTotal;//总记录数

    private Long recordsFiltered;//过滤后的总记录数

    private Object data;//具体的数据

    public String getDraw() {
        return draw;
    }

    public void setDraw(String draw) {
        this.draw = draw;
    }

    public Long getRecordsTotal() {
        return recordsTotal;
    }

    public void setRecordsTotal(Long recordsTotal) {
        this.recordsTotal = recordsTotal;
    }

    public Long getRecordsFiltered() {
        return recordsFiltered;
    }

    public void setRecordsFiltered(Long recordsFiltered) {
        this.recordsFiltered = recordsFiltered;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public PageRestModel(String draw, Long recordsTotal, Long recordsFiltered, Object data) {
        this.draw = draw;
        this.recordsTotal = recordsTotal;
        this.recordsFiltered = recordsFiltered;
        this.data = data;
    }
}
