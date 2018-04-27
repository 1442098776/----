package com.shop.eshop.mapper;

import com.shop.eshop.model.GoodPic;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GoodPicMapper {

    /**
     * 保存商品图片信息
     * @param goodPic
     * @return
     */
    Integer insertGoodPic(GoodPic goodPic);
}
