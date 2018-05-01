package com.shop.eshop.controller;

import com.shop.eshop.dto.Count;
import com.shop.eshop.service.CountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * create by zhanguo.huang on 2018.05.01
 */
@RestController
public class CountController {
    @Autowired
    private CountService countService;
    @PostMapping("/admin/count")
    public Count adminSystemCount(){
        Count count = countService.orderCount();
        Count count1 = countService.userCount();
        Integer goodNum = countService.goodCount();
        Integer goodTypeNum = countService.goodTypeCount();
        count.setUserNum(count1.getUserNum());
        count.setCommonUser(count1.getCommonUser());
        count.setDisableUser(count1.getDisableUser());
        count.setEnableUser(count1.getEnableUser());
        count.setSystemManager(count1.getSystemManager());
        count.setGoodNum(goodNum);
        count.setGoodTypeNum(goodTypeNum);
        return count;
    }
}
