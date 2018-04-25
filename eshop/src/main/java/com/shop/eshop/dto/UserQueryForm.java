package com.shop.eshop.dto;

public class UserQueryForm {
    private Object searchKey;
    private Integer role;

    public Object getSearchKey() {
        return searchKey;
    }

    public void setSearchKey(Object searchKey) {
        this.searchKey = searchKey;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }
}
