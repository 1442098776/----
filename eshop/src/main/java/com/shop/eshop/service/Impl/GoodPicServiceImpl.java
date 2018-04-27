package com.shop.eshop.service.Impl;

import com.shop.eshop.mapper.GoodPicMapper;
import com.shop.eshop.model.GoodPic;
import com.shop.eshop.service.GoodPicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * create by zhanguo.huang on 2018-04-27
 */
@Service
public class GoodPicServiceImpl implements GoodPicService {

    @Autowired
    private GoodPicMapper goodPicMapper;
    @Override
    public Integer insertGoodPic(GoodPic goodPic) {
        return goodPicMapper.insertGoodPic(goodPic);
    }
}
