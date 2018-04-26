package com.shop.eshop.controller;

import com.shop.eshop.model.Good;
import com.shop.eshop.model.GoodType;
import com.shop.eshop.service.GoodService;
import com.shop.eshop.service.GoodTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * @author zhanguo.huang
 * @date 2018-04-25
 */
@RestController
public class GoodController {

    @Autowired
    private GoodTypeService goodTypeService;

    @Autowired
    private GoodService goodService;

    /**
     * 获取商品类型
     * @return
     */
    @PostMapping("/admin/getGoodType")
    public List<GoodType> getAllGoodType(){
        return goodTypeService.getGoodTypeByParentId(0);
    }

    /**
     * 删除类型
     * @param id
     * @return
     */
    @PostMapping("/admin/deleteGoodType")
    public String deleteGoodType(String id){
        String[] idStrs = id.split(",");
        List<Long> idList = new ArrayList<>();
        for(String idStr :idStrs){
            idList.add(Long.parseLong(idStr));
        }
        Integer is_delete = goodTypeService.deleteGoodType(new ArrayList<>());
        if(is_delete != null && is_delete > 0){
            return "1";
        }else{
            return "0";
        }
    }

    /**
     * 获取所有的商品
     * @return
     */
    @PostMapping("/admin/manageGood")
    public List<Good> manageGood(String searchKey){
        if(searchKey != null){
            return goodService.getGoodByKeyWord(searchKey);
        }else{
            return goodService.getAllGood();
        }
    }

    /**
     * 更新商品信息
     * @param good
     * @return
     */
    @PostMapping("/admin/updateGood")
    public String updateGood(Good good){
        Integer is_update = goodService.updateGood(good);
        if(is_update != null && is_update > 0){
            return "1";
        }else {
            return "0";
        }
    }


    /**
     * 获取所有的非一级类型
     * @return
     */
    @PostMapping("/admin/getAllType")
    public List<GoodType> getAllSonType(){
        return goodTypeService.getAllSonType();
    }


    /**
     * 获取所有的非一级类型
     * @return
     */
    @PostMapping("/admin/addGood")
    public String addGood(Good good, @RequestParam(value = "file") MultipartFile[] files, HttpServletRequest request){
        //这里能直接得到文件数组，怎么保存到服务器相信不用我多说了
//        List<String> list = new ArrayList<String>();
//        if (files != null && files.length > 0) {
//            for (int i = 0; i < files.length; i++) {
//                MultipartFile file = files[i];
//                // 保存文件
//                list = saveFile(request, file, list);
//            }
//        }
//        //写着测试，删了就可以
//        for (int i = 0; i < list.size(); i++) {
//            System.out.println("集合里面的数据" + list.get(i));
//        }
        return "home/index";//跳转的页面
    }


    private List<String> saveFile(HttpServletRequest request,
                                  MultipartFile file, List<String> list) {
        // 判断文件是否为空
        if (!file.isEmpty()) {
            try {
                // 保存的文件路径(如果用的是Tomcat服务器，文件会上传到\\%TOMCAT_HOME%\\webapps\\YourWebProject\\upload\\文件夹中
                // )
//                String filePath = "D:/IdeaProject/demo/src/main/resources/static/images/"
//                        + "upload/" + file.getOriginalFilename();
                String filePath = request.getSession().getServletContext()
                        .getRealPath("/")
                        + "upload/" + file.getOriginalFilename();
                System.out.println(filePath);
                list.add(file.getOriginalFilename());
                File saveDir = new File(filePath);
                if (!saveDir.getParentFile().exists())
                    saveDir.getParentFile().mkdirs();

                // 转存文件
                file.transferTo(saveDir);
                return list;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return list;
    }
}
