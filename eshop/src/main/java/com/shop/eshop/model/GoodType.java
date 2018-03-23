package com.shop.eshop.model;

import java.util.Date;
import java.util.List;

public class GoodType {
    private Short id;

    private String name;

    private Short parentId;

    private Date createTime;

    private Short menuId;

    private List<GoodType> goodTypes;

    private List<Good> good;

    public List<Good> getGood() {
        return good;
    }

    public void setGood(List<Good> good) {
        this.good = good;
    }

    public List<GoodType> getGoodTypes() {
        return goodTypes;
    }

    public void setGoodTypes(List<GoodType> goodTypes) {
        this.goodTypes = goodTypes;
    }

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Short getParentId() {
        return parentId;
    }

    public void setParentId(Short parentId) {
        this.parentId = parentId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Short getMenuId() {
        return menuId;
    }

    public void setMenuId(Short menuId) {
        this.menuId = menuId;
    }
}