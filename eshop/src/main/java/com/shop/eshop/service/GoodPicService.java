package com.shop.eshop.service;

import com.shop.eshop.model.GoodPic;

/**
 * create by zhanguo.huang on 2018-04-27
 */
public interface GoodPicService {

    /**
     * 保存商品信息
     * @param goodPic
     * @return
     */
    Integer insertGoodPic(GoodPic goodPic);

    /**
     * 根据商品id删除商品图片
     * @param goodId
     * @return
     */
    Integer deleteGoodPicByGoodId(Long goodId);
}
