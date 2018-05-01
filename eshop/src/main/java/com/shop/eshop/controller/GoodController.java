package com.shop.eshop.controller;

import com.shop.eshop.model.Good;
import com.shop.eshop.model.GoodPic;
import com.shop.eshop.model.GoodType;
import com.shop.eshop.service.GoodPicService;
import com.shop.eshop.service.GoodService;
import com.shop.eshop.service.GoodTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.ArrayList;
import java.util.Date;
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

    @Autowired
    private GoodPicService goodPicService;

    /**
     * 获取商品类型
     * @return
     */
    @PostMapping("/admin/getGoodType")
    public List<GoodType> getAllGoodType(){
        return goodTypeService.getGoodTypeByParentId(0);
    }

    /**
     * 添加商品类型
     * @param goodType
     * @return
     */
    @PostMapping("/admin/insertGoodType")
    public String adminAddGoodType(GoodType goodType){
        Integer checkTypeName = goodTypeService.checkTypeName(goodType);
        if(checkTypeName != null && checkTypeName > 0){
            return "2";//分类名已存在
        }else {
            goodType.setCreateTime(new Date());
            Integer is_insert = goodTypeService.insertGoodType(goodType);
            if(is_insert != null && is_insert > 0){
                return "1";
            }else {
                return "0";
            }
        }

    }

    /**
     * 更新商品分类信息
     * @param goodType
     * @return
     */
    @PostMapping("/admin/updateGoodType")
    public String adminUpdateGoodType(GoodType goodType){
        Integer checkTypeName = goodTypeService.checkTypeName(goodType);
        if(checkTypeName != null && checkTypeName > 0){
            return "2";//分类名已存在
        }else {
            goodType.setModifyTime(new Date());
            Integer is_update = goodTypeService.updateGoodType(goodType);
            if(is_update != null && is_update > 0){
                return "1";
            }else {
                return "0";
            }
        }
    }

    /**
     * 删除类型
     * @param id
     * @return
     */
    @PostMapping("/admin/deleteGoodType")
    public String deleteGoodType(String id){
        String[] idStrs = id.split(",");
        List<Short> idList = new ArrayList<>();
        for(String idStr :idStrs){
            idList.add(Short.parseShort(idStr));
        }
        //得到所有的要删除的商品id
        List<Long> goodIdList = goodService.getGoodByType(idList);
        //删除分类
        Integer is_delete = goodTypeService.deleteGoodType(idList);
        if(is_delete != null && is_delete > 0){
            //删除商品
            Integer is_delete_good = goodService.deleteGoodByType(idList);
            //删除商品图片
            for(int i = 0;i < goodIdList.size();i++){
                System.out.println(goodIdList.get(i).toString());
                File file = new File("E:/GitHub/shop/eshop/eshop/src/main/resources/static/img/"+goodIdList.get(i).toString());
                File[] files = file.listFiles();
                if(files != null) {
                    for (int j = 0; j < files.length; j++) {
                        //删除子文件
                        if (files[j].isFile()) {
                            files[j].delete();
                        }
                    }
                    file.delete();
                }
            }
            if(is_delete_good != null && is_delete_good > 0){
                return "1";
            }else {
                return "0";
            }
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
        good.setModifyTime(new Date());
        Integer is_update = goodService.updateGood(good);
        if(is_update != null && is_update > 0){
            return "1";
        }else {
            return "0";
        }
    }
    /**
     * 更新商品详细信息
     * @param good
     * @return
     */
    @PostMapping("/admin/updateGoodInfo")
    public String updateGoodInfo(Good good, @RequestParam(value = "file") MultipartFile[] files, HttpServletRequest request){
        good.setModifyTime(new Date());
        Integer is_update = goodService.updateGood(good);
        File file2 = new File("E:/GitHub/shop/eshop/eshop/src/main/resources/static/img/"+good.getId());
        GoodPic goodPic = new GoodPic();
        if(is_update != null && is_update > 0){
            //这里能直接得到文件数组，怎么保存到服务器相信不用我多说了
            if (files != null && files.length > 0) {
                Integer is_delete = goodPicService.deleteGoodPicByGoodId(good.getId());
                if(is_delete != null && is_delete > 0){
                    File[] fileList = file2.listFiles();
                    if(fileList != null){
                        for (int i = 0; i < fileList.length; i++) {
                            //删除子文件
                            if (fileList[i].isFile()) {
                                fileList[i].delete();
                            }
                        }
                        file2.delete();
                    }
                    for (int j = 0; j < files.length; j++) {
                        MultipartFile file = files[j];
                        if(j == 0){
                            goodPic.setGrade(0);
                        }else {
                            goodPic.setGrade(1);
                        }
                        goodPic.setCreateTime(new Date());
                        goodPic.setPicName(file.getOriginalFilename());
                        goodPic.setGoodId(good.getId());
                        Integer  is_insert_pic = goodPicService.insertGoodPic(goodPic);
                        saveFile2(request, file,good.getId());//上传到项目的绝对地址
//                        flag = saveFile2(request, file,good.getId());//上传到temp上
                    }
                }
            }
//        //写着测试，删了就可以
//        for (int i = 0; i < list.size(); i++) {
//            System.out.println("集合里面的数据" + list.get(i));
//        }
        }
        if(is_update != null && is_update > 0){
            return "1";
        }else {
            return "0";
        }
    }


    /**
     * 获取所有的父级类型
     * @return
     */
    @PostMapping("/admin/getAllType")
    public List<GoodType> getAllSonType(){
        return goodTypeService.getGoodTypeByParentId(0);
    }


    /**
     * 添加商品
     * @return
     */
    @PostMapping("/admin/addGood")
    public String addGood(Good good, @RequestParam(value = "file") MultipartFile[] files, HttpServletRequest request){

        good.setCreateTime(new Date());
        //添加商品
        Integer is_insert = goodService.insertGood(good);
        Boolean flag = true;
        File file2 = new File("E:/GitHub/shop/eshop/eshop/src/main/resources/static/img/"+good.getId());
        GoodPic goodPic = new GoodPic();
        if(is_insert != null && is_insert > 0){
            //这里能直接得到文件数组，怎么保存到服务器相信不用我多说了
            if (files != null && files.length > 0) {
                for (int i = 0; i < files.length; i++) {
                    MultipartFile file = files[i];
                    if(i == 0){
                        goodPic.setGrade(0);
                    }else {
                        goodPic.setGrade(1);
                    }
                    goodPic.setCreateTime(new Date());
                    goodPic.setPicName(file.getOriginalFilename());
                    goodPic.setGoodId(good.getId());
                    Integer  is_insert_pic = goodPicService.insertGoodPic(goodPic);
                    if(is_insert_pic != null && is_insert_pic > 0){
                        // 保存文件
                        flag = saveFile(request, file,good.getId());//上传到项目的绝对地址
//                        flag = saveFile2(request, file,good.getId());//上传到temp上
                    }else {
                        flag = false;
                        break;
                    }

                }
            }
//        //写着测试，删了就可以
//        for (int i = 0; i < list.size(); i++) {
//            System.out.println("集合里面的数据" + list.get(i));
//        }
        }
        if(flag){
            return "1";
        }else {
            //添加商品失败则吧添加到数据库的信息删除
            Integer is_delete = goodService.deleteGoodById(good.getId());
            if(is_delete != null && is_delete > 0){
                File[] filesw = file2.listFiles();
                if(filesw != null){
                    for (int j = 0; j < filesw.length; j++) {
                        //删除子文件
                        if (filesw[j].isFile()) {
                            filesw[j].delete();
                        }
                    }
                    file2.delete();
                }
            }
            return "0";
        }
    }
    /**
     *
     * @param request 用户获取request.getSession().getServletContext().getRealPath("/")
     * @param file 下上传的文件
     * @param id 用户已商品id做完文件夹名
     * @return
     */
    private boolean saveFile(HttpServletRequest request,
                                  MultipartFile file,Long id) {
        // 判断文件是否为空
        if (!file.isEmpty()) {
            try {
                // 保存的文件路径(如果用的是Tomcat服务器，文件会上传到\\%TOMCAT_HOME%\\webapps\\YourWebProject\\upload\\文件夹中
                // )D:/GitHub/shop/eshop/eshop/src/main/resources/static/img/
                String filePath = "E:/GitHub/shop/eshop/eshop/src/main/resources/static/img/"
                        + id+"/" + file.getOriginalFilename();
                System.out.println(filePath);
//                list.add(file.getOriginalFilename());
                File saveDir = new File(filePath);
                if (!saveDir.getParentFile().exists())
                    saveDir.getParentFile().mkdirs();

                // 转存文件
                file.transferTo(saveDir);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return false;
    }


    /**
     * 上传到temp下能够在不重启项目的情况下能及时显示
     * @param request
     * @param file
     * @param id
     * @return
     */
    private boolean saveFile2(HttpServletRequest request,
                             MultipartFile file,Long id) {
        // 判断文件是否为空
        if (!file.isEmpty()) {
            try {
                // 保存的文件路径(如果用的是Tomcat服务器，文件会上传到\\%TOMCAT_HOME%\\webapps\\YourWebProject\\upload\\文件夹中
                // )D:/GitHub/shop/eshop/eshop/src/main/resources/static/img/
                String filePath2 = request.getSession().getServletContext()
                        .getRealPath("img/")
                        + id+"/" + file.getOriginalFilename();
                File saveDir2 = new File(filePath2);
                if (!saveDir2.getParentFile().exists())
                    saveDir2.getParentFile().mkdirs();

                file.transferTo(saveDir2);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return false;
    }
    /**
     * 跳转到编辑页面
     * @param id
     * @return
     */
    @RequestMapping("/admin/editGood/{id}")
    public ModelAndView toEditGood(@PathVariable Long id){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("admin/edit_product");
        mv.addObject("id",id);
        return mv;
    }

    /**
     * 管理员编辑商品信息
     * @param id
     * @return
     */
    @PostMapping("/admin/toEditGood")
    public Good adminToEditGood(Long id){
        Good good = goodService.getGoodById(id);
        return good;
    }

    /**
     * 管理员删除商品
     * @param id
     * @return
     */
    @PostMapping("/admin/adminDeleteGood")
    public String adminDeleteGood(String id,HttpServletRequest request){
        if(id != "" && id != null){
            String[] ids = id.split(",");
            List<Long> goodIds = new ArrayList<>();
            for(int i = 0;i < ids.length;i++){
                goodIds.add(Long.parseLong(ids[i]));
            }
            Integer is_delete = null;
            for(Long goodId:goodIds){
                //删除temp下的文件
                String filePath2 = request.getSession().getServletContext()
                        .getRealPath("img/")
                        + goodId;
                File file = new File(filePath2);
                //删除项目static目录下的文件
//                File file = new File("E:/GitHub/shop/eshop/eshop/src/main/resources/static/img/"+goodId);
                File[] files = file.listFiles();
                if(files != null){
                    for (int j = 0; j < files.length; j++) {
                        //删除子文件
                        if (files[j].isFile()) {
                            files[j].delete();
                        }
                    }
                    file.delete();
                }
                is_delete = goodService.deleteGoodById(goodId);
            }

            if(is_delete != null && is_delete > 0){
                return "1";
            }else {
                return "0";
            }
        }else {
            return "0";
        }
    }

}
