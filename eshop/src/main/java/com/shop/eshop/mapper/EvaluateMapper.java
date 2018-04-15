package com.shop.eshop.mapper;

import com.shop.eshop.model.Evaluate;

public interface EvaluateMapper {


    int deleteByPrimaryKey(Long id);

    int insert(Evaluate record);

    int insertSelective(Evaluate record);


    Evaluate selectByPrimaryKey(Long id);



    int updateByPrimaryKeySelective(Evaluate record);

    int updateByPrimaryKey(Evaluate record);
}