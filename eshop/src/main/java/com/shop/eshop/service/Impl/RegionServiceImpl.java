package com.shop.eshop.service.Impl;

import com.shop.eshop.mapper.AreaMapper;
import com.shop.eshop.mapper.CityMapper;
import com.shop.eshop.mapper.ProvinceMapper;
import com.shop.eshop.model.Area;
import com.shop.eshop.model.City;
import com.shop.eshop.model.Province;
import com.shop.eshop.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionServiceImpl implements RegionService {

    @Autowired
    private ProvinceMapper provinceMapper;
    @Autowired
    private CityMapper cityMapper;
    @Autowired
    private AreaMapper areaMapper;

    /**
     * 获取所以的省级地区
     * @return
     */
    @Override
    public List<Province> getAllProvince() {
        return provinceMapper.selectAllProvince();
    }

    /**
     * 根据省级编号获取城市
     * @param province_id
     * @return
     */
    @Override
    public List<City> getAllCityByProvinceId(Integer province_id) {
        return cityMapper.selectAllByParent(province_id);
    }

    /**
     * 根据城市编号获取县
     * @param city_id
     * @return
     */
    @Override
    public List<Area> getAllAreaByCityId(Integer city_id) {
        return areaMapper.selectAllByParent(city_id);
    }
}
