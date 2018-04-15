package com.shop.eshop.mapper;

import com.shop.eshop.model.City;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CityMapper {

    int insert(City record);

    int deleteByPrimaryKey(Long id);

    City selectByPrimaryKey(Integer id);

    List<City> selectAllByParent(Integer province_id);

    int updateByPrimaryKey(City record);
}