package com.shop.eshop.service.Impl;

import com.shop.eshop.mapper.GoodMapper;
import com.shop.eshop.model.Good;
import com.shop.eshop.service.GoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class GoodServiceImpl implements GoodService {

    @Autowired
    private GoodMapper goodMapper;
    @Override
    public List<Good> getAllGood() {
        return goodMapper.getAllGood();
    }
}
