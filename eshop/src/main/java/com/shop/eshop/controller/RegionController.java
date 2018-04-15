package com.shop.eshop.controller;

import com.shop.eshop.model.Area;
import com.shop.eshop.model.City;
import com.shop.eshop.model.Province;
import com.shop.eshop.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author zhanguo.huang
 * @date 2018/03/20
 * 获取省市县
 */
@RestController
public class RegionController {

    @Autowired
    private RegionService regionService;

    @PostMapping("/province")
    public List<Province> getAllProvince(){
        List<Province> provinceList = regionService.getAllProvince();
        return provinceList;
    }

    @PostMapping("/city")
    public List<City> getAllCityByProvinceId(Integer province_id){
        List<City> cityList = regionService.getAllCityByProvinceId(province_id);
        return cityList;
    }

    @PostMapping("/area")
    public List<Area> getAllAreaByCityId(Integer city_id){
        List<Area> areaList = regionService.getAllAreaByCityId(city_id);
        return areaList;
    }
}
