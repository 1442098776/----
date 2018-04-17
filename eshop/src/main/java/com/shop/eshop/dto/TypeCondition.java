package com.shop.eshop.dto;

import java.util.List;

public class TypeCondition {
    private Integer typeId;
    private Integer count;
    /**
     * 类型集合
     */
    private List list;
    /**
     * 按什么排序0：按综合牌组1:按销量降序 2：按价格排序
     */
    private Integer type;

    private String keyWord;

    public String getKeyWord() {
        return keyWord;
    }

    public void setKeyWord(String keyWord) {
        this.keyWord = keyWord;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }


    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public List getList() {
        return list;
    }

    public void setList(List list) {
        this.list = list;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
