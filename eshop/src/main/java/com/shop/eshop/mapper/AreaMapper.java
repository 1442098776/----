package com.shop.eshop.mapper;


import com.shop.eshop.model.Area;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AreaMapper {

    int deleteByPrimaryKey(Long id);

    int insert(Area record);

    Area selectByPrimaryKey(Long id);

    List<Area> selectAllByParent(Integer city_id);

    int updateByPrimaryKey(Area record);
}