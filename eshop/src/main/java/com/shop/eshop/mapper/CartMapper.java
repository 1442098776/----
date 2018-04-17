package com.shop.eshop.mapper;

import com.shop.eshop.model.Cart;
import com.shop.eshop.model.CartVO;
import com.shop.eshop.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
public interface CartMapper {

    List<CartVO> getCartSelect(List<Long> cartId);
    /**
     * 根据购物车id更改购物车商品信息
     * @param cart
     * @return
     */
    Integer updateGoodCart(Cart cart);
    /**
     * 检查该用户的购物车是否已存在该商品
     * @param cart
     * @return
     */
    Cart checkGood(Cart cart);
    /**
     * 根据用户id获取该用户所有的购物车信息
     * @param user
     * @return
     */
    List<CartVO> getAllCartByUserId(User user);

    /**
     * 根据用户id获取该用户购物车的商品数量
     * @param user
     * @return
     */
    Integer getCountByUserId(User user);

    /**
     * 根据用户Id添加购物车
     * @param cart
     * @return
     */
    Integer addGoodToCart(Cart cart);

    /**
     * 根据id删除购物车
     * @param list
     * @return
     */
    Integer deleteCartGoodById(List<Long> list);
}