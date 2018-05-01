package com.shop.eshop.mapper;

import com.shop.eshop.model.City;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityMapper {

    int insert(City record);

    int deleteByPrimaryKey(Long id);

    City selectByPrimaryKey(Integer id);

    List<City> selectAllByParent(Integer province_id);

    int updateByPrimaryKey(City record);
}