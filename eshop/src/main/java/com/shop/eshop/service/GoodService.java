package com.shop.eshop.service;

import com.shop.eshop.dto.TypeCondition;
import com.shop.eshop.model.Good;

import java.util.List;

public interface GoodService {
    List<Good> getAllGood();
    Good getGoodById(Long id);
    List<Good> getGoodBySaleNum();

    List<Good> getGoodByCondition(TypeCondition tp);
}
