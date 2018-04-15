package com.shop.eshop.mapper;

import com.shop.eshop.dto.TypeCondition;
import com.shop.eshop.model.Good;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GoodMapper {

    List<Good> getGoodByCondition(TypeCondition tp);

    List<Good> getAllGood();

    Good getGoodById(Long id);

    List<Good> getGoodBySaleNum();

    List<Good> getGoodByType(Integer id);
}
