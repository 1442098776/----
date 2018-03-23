package com.shop.eshop.service.Impl;

import com.shop.eshop.dto.TypeCondition;
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

    @Override
    public Good getGoodById(Integer id) {
        return goodMapper.getGoodById(id);
    }

    @Override
    public List<Good> getGoodBySaleNum() {
        return goodMapper.getGoodBySaleNum();
    }

    @Override
    public List<Good> getGoodByCondition(TypeCondition tp) {
        return goodMapper.getGoodByCondition(tp);
    }
}
