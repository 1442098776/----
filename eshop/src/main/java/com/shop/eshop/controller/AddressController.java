package com.shop.eshop.controller;

import com.shop.eshop.model.Address;
import com.shop.eshop.model.User;
import com.shop.eshop.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * @author zhanguo.huang
 * @date 2018-04-05
 */
@RestController
public class AddressController {

    @Autowired
    private AddressService addressService;
    /**
     * 添加保存地址
     * @return
     */
    @PostMapping("/address/saveAddress")
    public String saveAddress(Address address, HttpServletRequest request, HttpServletResponse response){
        User user = (User) request.getSession().getAttribute("user");
        address.setUserId(user.getUserId());
        List<Address> addressList = addressService.getAllAddressByUserId(user.getUserId());
        if(addressList.size() > 0){
            Integer flag = addressService.insertAddress(address);
            if(flag != null && flag > 0){
                //成功
                if(addressList.size() > 4){
                    //不在页面继续显示新加地址
                    return "2";
                }else {
                    //继续在页面显示新加地址
                    return "1";
                }
            }else {
                //不成功
                return "0";
            }
        }else {
            //设置地址等级
            address.setLevel(1);
            Integer flag = addressService.insertAddress(address);
            if(flag != null && flag > 0){
                //成功
                return "1";
            }else {
                //不成功
                return "0";
            }
        }

    }

    /**
     * 删除地址
     * @param address
     * @return 1:成功 0：失败
     */
    @PostMapping("/address/deleteAddress")
    public String deleteAddress(Address address){
        Integer is_delete = addressService.deleteAddressById(address.getAddressId());
        if(is_delete != null && is_delete > 0){
            return "1";
        }else{
            return "0";
        }
    }

    /**
     * 获取地址
     * @return
     */
    @PostMapping("/address/getAllAddress")
    public List<Address> getAllAddress(HttpServletRequest request){
        User user = (User) request.getSession().getAttribute("user");
        List<Address> addressList = addressService.getAllAddressByUserId(user.getUserId());
        return addressList;
    }

    /**
     * 获取地址的条数
     * @param request
     * @return
     */
    @PostMapping("/address/getAddressCount")
    public String getAddressCount(HttpServletRequest request){
        User user = (User) request.getSession().getAttribute("user");
        Integer count = addressService.getAddressCount(user.getUserId());
        if(count != null && count == 20){
            return "0";
        }else{
            return "1";
        }
    }

    /**
     * 更爱默认地址
     * @param address
     * @param request
     * @param type
     * @return 1:成功 0:失败
     */
    @PostMapping("/address/updateAddress")
    public String updateAddress(Address address,Integer type,HttpServletRequest request){
        User user = (User) request.getSession().getAttribute("user");
        if(type == 0){
            Address defaultAddress = addressService.getDefaultAddress(user.getUserId());
            //把默认地址改为普通地址
            defaultAddress.setLevel(2);
            Integer modifDefault = addressService.updateUserAddress(defaultAddress);
            if(modifDefault != null && modifDefault >0){
                Address address1 = addressService.getAddressById(address);
                //修改默认
                address1.setLevel(1);
                Integer updateDefaultAddress = addressService.updateUserAddress(address1);
                if(updateDefaultAddress != null && updateDefaultAddress >0){
                    return "1";
                }else{
                    return "0";
                }
            }else{
                return "0";
            }
        }else {
            Address address1 = addressService.getAddressById(address);
            address1.setConsignee(address.getConsignee());
            address1.setPhone(address.getPhone());
            address1.setAddressName(address.getAddressName());
            Integer updateAddress = addressService.updateUserAddress(address1);
            if(updateAddress != null && updateAddress >0){
                return "1";
            }else {
                return "0";
            }
        }

    }

    /**
     * 根据id获取地址
     * @param address
     * @return
     */
    @PostMapping("/address/getAddressById")
    public Address getAddressById(Address address){
        address = addressService.getAddressById(address);
        return address;
    }
}
