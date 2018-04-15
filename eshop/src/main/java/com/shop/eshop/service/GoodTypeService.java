package com.shop.eshop.service;

import com.shop.eshop.dto.TypeCondition;
import com.shop.eshop.model.Good;
import com.shop.eshop.model.GoodType;

import java.util.List;

public interface GoodTypeService {
    List<GoodType> getGoodTypeByMenuId(Integer id);

    List<Good> getGoodByCondition(TypeCondition tp);
}
