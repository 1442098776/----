package com.shop.eshop.service;

import com.shop.eshop.model.Area;
import com.shop.eshop.model.City;
import com.shop.eshop.model.Province;

import java.util.List;

public interface RegionService {

    List<Province> getAllProvince();

    List<City> getAllCityByProvinceId(Integer province_id);

    List<Area> getAllAreaByCityId(Integer city_id);
}
