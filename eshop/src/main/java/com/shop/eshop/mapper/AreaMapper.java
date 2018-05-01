package com.shop.eshop.mapper;


import com.shop.eshop.model.Area;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreaMapper {

    int deleteByPrimaryKey(Long id);

    int insert(Area record);

    Area selectByPrimaryKey(Long id);

    List<Area> selectAllByParent(Integer city_id);

    int updateByPrimaryKey(Area record);
}