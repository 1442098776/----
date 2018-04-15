package com.shop.eshop.service;

import com.shop.eshop.model.Address;

import java.util.List;

public interface AddressService {

    /**
     * 更新用户的默认地址
     * @param address
     * @return
     */
    Integer updateUserAddress(Address address);
    /**
     * 添加地址
     * @param address
     * @return
     */
    Integer insertAddress(Address address);
    /**
     * 根据id获取地址信息
     * @param address
     * @return
     */
    Address getAddressById(Address address);

    /**
     * 根据用户id获取所以地址
     * @param id
     * @return
     */
    List<Address> getAllAddressByUserId(Long id);

    /**
     * 获取用户的地址条数
     * @param userId
     * @return
     */
    Integer getAddressCount(Long userId);

    /**
     * 获取默认地址
     * @param userId
     * @return
     */
    Address getDefaultAddress(Long userId);

    /**
     * 删除地址
     * @param addressId
     * @return
     */
    Integer deleteAddressById(Long addressId);
}
