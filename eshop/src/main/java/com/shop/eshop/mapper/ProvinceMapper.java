package com.shop.eshop.mapper;

import com.shop.eshop.model.Province;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface ProvinceMapper {

    int deleteByPrimaryKey(Integer id);

    int insert(Province record);


    Province selectByPrimaryKey(Integer id);

    List<Province> selectAllProvince();

    int updateByPrimaryKey(Province record);
}