package com.shop.eshop.mapper;

import com.shop.eshop.model.Address;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AddressMapper {

    /**
     * 根据id获取地址
     * @param address
     * @return
     */
    Address getAddressById(Address address);
    /**
     * 添加地址
     * @param address
     * @return
     */
    Integer insertAddress(Address address);

    /**
     * 更新用户默认收货地址
     * @param address
     * @return
     */
    Integer updateUserAddress(Address address);

    /**
     * 根据user_id获取地址列表
     * @param userId
     * @return
     */
    List<Address> getAllAddressByUserId(Long userId);

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