package com.shop.eshop.service.Impl;

import com.shop.eshop.mapper.CartMapper;
import com.shop.eshop.model.Cart;
import com.shop.eshop.model.CartVO;
import com.shop.eshop.model.User;
import com.shop.eshop.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartMapper cartMapper;

    /**
     * 获取已选择的列表
     * @param cartId
     * @return
     */
    @Override
    public List<CartVO> getCartSelect(List<Long> cartId) {
        return cartMapper.getCartSelect(cartId);
    }

    /**
     * 更新购物车
     * @param cart
     * @return
     */
    @Override
    public Integer updateCart(Cart cart) {
        return cartMapper.updateGoodCart(cart);
    }

    /**
     * 检查购物个是否有该商品
     * @param cart
     * @return
     */
    @Override
    public Cart checkCart(Cart cart) {
        return cartMapper.checkGood(cart);
    }

    /**
     * 根据用户的id获取该用户的所以购物车信息
     * @param user
     * @return
     */
    @Override
    public List<CartVO> getAllCartByUserId(User user) {
        return cartMapper.getAllCartByUserId(user);
    }

    /**
     * 根据用户id获取该用户购物车条数
     * @param user
     * @return
     */
    @Override
    public Integer getCountByUserId(User user) {
        return cartMapper.getCountByUserId(user);
    }

    /**
     * 添加购物车
     * @param cart
     * @return
     */
    @Override
    public Integer addGoodToCart(Cart cart) {
        return cartMapper.addGoodToCart(cart);
    }
}
