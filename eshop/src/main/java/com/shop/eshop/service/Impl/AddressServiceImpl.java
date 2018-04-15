package com.shop.eshop.service.Impl;

import com.shop.eshop.mapper.AddressMapper;
import com.shop.eshop.model.Address;
import com.shop.eshop.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressMapper addressMapper;

    /**
     * 更新用户的默认地址
     * @param address
     * @return
     */
    @Override
    public Integer updateUserAddress(Address address) {
        return addressMapper.updateUserAddress(address);
    }

    /**
     * 添加地址
     * @param address
     * @return
     */
    @Override
    public Integer insertAddress(Address address) {
        return addressMapper.insertAddress(address);
    }

    /**
     * 根据id获取地址
     * @param address
     * @return
     */
    @Override
    public Address getAddressById(Address address) {
        return addressMapper.getAddressById(address);
    }

    /**
     * 根据用户的id获取该用户下的所以地址
     * @param id
     * @return
     */
    @Override
    public List<Address> getAllAddressByUserId(Long id) {
        return addressMapper.getAllAddressByUserId(id);
    }

    /**
     * 获取用户的地址条数
     * @param userId
     * @return
     */
    @Override
    public Integer getAddressCount(Long userId) {
        return addressMapper.getAddressCount(userId);
    }

    @Override
    public Address getDefaultAddress(Long userId) {
        return addressMapper.getDefaultAddress(userId);
    }

    @Override
    public Integer deleteAddressById(Long addressId) {
        return addressMapper.deleteAddressById(addressId);
    }

}
