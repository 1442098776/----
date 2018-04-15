package com.shop.eshop.service;

import com.shop.eshop.model.Cart;
import com.shop.eshop.model.CartVO;
import com.shop.eshop.model.User;

import java.util.List;

public interface CartService {

    /**
     * 获取已选择的购物车的列表
     * @param cartId
     * @return
     */
    List<CartVO> getCartSelect(List<Long> cartId);
    /**
     * 根据id更新信息
     * @param cart
     * @return
     */
    Integer updateCart(Cart cart);

    /**
     * 根据商品id检查是否已添加了该商品进购物车
     * @param cart
     * @return
     */
    Cart checkCart(Cart cart);

    /**
     * 根据用户id获取该用户的购物车信息
     * @param user
     * @return
     */
    List<CartVO> getAllCartByUserId(User user);

    /**
     * 根据用户id获取该用户购物车条目
     * @param user
     * @return
     */
    Integer getCountByUserId(User user);

    /**
     * 添加商品到购物车
     * @param cart
     * @return
     */
    Integer addGoodToCart(Cart cart);
}
