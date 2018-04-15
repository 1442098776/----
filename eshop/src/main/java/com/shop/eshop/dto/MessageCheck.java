package com.shop.eshop.dto;

import com.shop.eshop.model.Address;

/**
 * @author zhanguo.huang
 * @date 2018-04-14
 */
public class MessageCheck {
    private Float sum;
    private String message;
    private Address address;

    public Float getSum() {
        return sum;
    }

    public void setSum(Float sum) {
        this.sum = sum;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
