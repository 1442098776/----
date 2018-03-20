package com.shop.eshop.mapper;

import com.shop.eshop.model.Good;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GoodMapper {
    List<Good> getAllGood();
}
