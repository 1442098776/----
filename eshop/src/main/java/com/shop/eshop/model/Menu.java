package com.shop.eshop.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 首页菜单导航
 */
public class Menu {
    private Integer id;
    private String name;
    private Short grade;
    private Integer parentId;
    private Boolean status;
    private String img;
    private Date createTime;
    private List<Menu> child;
    private List<GoodType> goodTypes;

    public List<GoodType> getGoodTypes() {
        return goodTypes;
    }

    public void setGoodTypes(List<GoodType> goodTypes) {
        this.goodTypes = goodTypes;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", grade=" + grade +
                ", parentId=" + parentId +
                ", status=" + status +
                ", img='" + img + '\'' +
                ", createTime=" + createTime +
                ", child=" + child +
                '}';
    }

    public Short getGrade() {
        return grade;
    }

    public void setGrade(Short grade) {
        this.grade = grade;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public List<Menu> getChild() {
        return child;
    }

    public void setChild(List<Menu> child) {
        this.child = child;
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


    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
