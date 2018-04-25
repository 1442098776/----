package com.shop.eshop.controller;

import com.shop.eshop.dto.MessageCheck;
import com.shop.eshop.dto.OrderStatus;
import com.shop.eshop.dto.OrderVo;
import com.shop.eshop.dto.SureBuy;
import com.shop.eshop.model.Address;
import com.shop.eshop.model.Order;
import com.shop.eshop.model.OrderDetail;
import com.shop.eshop.model.User;
import com.shop.eshop.service.AddressService;
import com.shop.eshop.service.OrderManageService;
import com.shop.eshop.service.OrderService;
import com.shop.eshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Vector;

/**
 * 订单controller
 * @author zhanguo.huang
 * @date 2018-04-11
 */
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private AddressService addressService;
    @Autowired
    private OrderManageService orderManageService;
    @Autowired
    private UserService userService;
    /**
     * 产生订单
     * @return
     */
    @PostMapping("/order/createOrder")
    public String createOrder(SureBuy sureBuy, HttpServletRequest request){
        User user = (User) request.getSession().getAttribute("user");

        Calendar calendar = Calendar.getInstance();
        //生成订单号**年月日+8位数
        String orderIdstr = "";
        Long orderId = null;
        boolean flag = true;
        while (flag) {
//            orderId = "";
        //时间一直到毫秒
//            orderIdstr += ""+ calendar.get(Calendar.YEAR)+(calendar.get(Calendar.MONTH)+1)+
//                    calendar.get(Calendar.DAY_OF_MONTH)+calendar.get(Calendar.HOUR_OF_DAY)+calendar.get(Calendar.MINUTE)+
//                    calendar.get(Calendar.SECOND)+calendar.get(Calendar.MILLISECOND);
//            double rand =  * 900000;
//            long orderId2 = (long) (Math.random()*1000);
//            orderIdstr += orderId2;
            //时间一直到日
            orderIdstr += ""+ calendar.get(Calendar.YEAR)+(calendar.get(Calendar.MONTH)+1)+
                    calendar.get(Calendar.DAY_OF_MONTH);
            //产生8位的随机数
            long orderIdstr2 = (long) (Math.random()*100000000);
            orderIdstr += orderIdstr2;
            orderId = Long.parseLong(orderIdstr);
            Integer checkCount = orderService.checkOrderId(orderId);
            if(checkCount == 0){
                flag = false;
            }

        }
//        return stuNumber;
//        Long OrderId = Long.parseLong(orderIdstr);
        Order order = new Order();
        order.setCreateTime(new Date());
        order.setOrderId(orderId);
        order.setUserId(user.getUserId());
        order.setMessage(sureBuy.getMessage());
        order.setSum(sureBuy.getSum());
        order.setReceiveAddress(sureBuy.getReceiveAddress());
        Integer createOrder = orderService.createOrder(order);
        if(createOrder != null && createOrder > 0){
            Address address = new Address();
            address.setAddressId(sureBuy.getReceiveAddress());
            address = addressService.getAddressById(address);
            sureBuy.setAddress(address);
            //保存到session
            request.getSession().setAttribute("messageCheck",sureBuy);
            request.getSession().setAttribute("orderId",orderId);
            OrderDetail orderDetail = new OrderDetail();
            String goodIds[] = sureBuy.getGoodIds().split(",");
            String goodCounts[] = sureBuy.getGoodCounts().split(",");
            String goodPrices[] = sureBuy.getGoodPrices().split(",");
            Integer addOrderDetail = null;
            for(int i = 0;i<goodIds.length;i++){
                orderDetail.setOrderId(orderId);
                orderDetail.setGoodId(Long.parseLong(goodIds[i]));
                orderDetail.setGoodCount(Integer.parseInt(goodCounts[i]));
                orderDetail.setGoodPrice(Float.parseFloat(goodPrices[i]));
                addOrderDetail = orderService.addOrderDetail(orderDetail);
            }
            if(addOrderDetail != null && addOrderDetail > 0){
                return "1";
            }else {
                return "0";
            }
        }else{
            return "0";
        }

    }

    /**
     * 获取所有的订单
     * @param request
     * @return
     */
    @PostMapping("/order/getAllOrderByUserId")
    public List<OrderVo> getAllOrderByUserId(HttpServletRequest request){
        User user = (User) request.getSession().getAttribute("user");
        List<OrderVo> orderVoList = orderManageService.getAllOrderByUserId(user.getUserId());
        return orderVoList;
    }

    /**
     * 根据状态获取订单
     * @param orderStatus
     * @param request
     * @return
     */
    @PostMapping("/order/getOrderByStatus")
    public List<OrderVo> getOrderByStatus(OrderStatus orderStatus,HttpServletRequest request){
        User user = (User) request.getSession().getAttribute("user");
        orderStatus.setUserId(user.getUserId());
        List<OrderVo> orderVoList = orderManageService.getOrderByStatus(orderStatus);
        return orderVoList;
    }

    /**
     * 更新订单信息
     * @param orderVo
     * @return
     */
    @PostMapping("/order/updateOrder")
    public String updateOrderStatus(OrderVo orderVo){
        Integer is_update = orderManageService.updateOrderStatus(orderVo);
        if(is_update != null && is_update > 0){
            return "1";
        }else {
            return "0";
        }
    }


    /**
     * 订单详细信息
     * @param orderVo
     * @return
     */
    @PostMapping("/order/getOrderDetail")
    public MessageCheck getOrderDetail(OrderVo orderVo){
        OrderVo orderVo1 = orderManageService.getOrderByOrderId(orderVo);
        Address address = new Address();
        address.setAddressId(orderVo1.getReceiveAddress());
        address = addressService.getAddressById(address);
        MessageCheck messageCheck = new MessageCheck();
        messageCheck.setAddress(address);
        messageCheck.setMessage(orderVo1.getMessage());
        return messageCheck;
    }

    /**
     * 管理员获取所有的订单
     * @return
     */
    @PostMapping("/order/getAllOrderByAdmin")
    public List<OrderVo> getAllOrderByAdmin(Order order){
        List<OrderVo> orderVoList = orderManageService.getAllOrderByAdmin(order);
        List<OrderVo> orderVoList1 = new Vector<>();
        for(OrderVo orderVo:orderVoList){
            Address address = new Address();
            address.setAddressId(orderVo.getReceiveAddress());
            address = addressService.getAddressById(address);
            User user = userService.getUserById(orderVo.getUserId());
            orderVo.setAddress(address);
            orderVo.setUser(user);
            orderVoList1.add(orderVo);
        }
        return orderVoList1;
    }

    /**
     * 将订单状态改为删除
     * @param orderId
     * @return
     */
    @PostMapping("/order/deleteOrder")
    public String deleteOrder(String orderId){
        String[] orderIdStrs = orderId.split(",");
        OrderVo orderVo = new OrderVo();
        Integer is_update = null;
        for(String orderIdStr :orderIdStrs){
            Long orderIdLong = Long.parseLong(orderIdStr);
            orderVo.setOrderId(orderIdLong);
            orderVo.setStatus(4);
            is_update = orderManageService.updateOrderStatus(orderVo);

        }
        if(is_update != null && is_update > 0){
            return "1";
        }else{
            return "0";
        }
    }

    /**
     * 更新订单信息
     * @param orderVo
     * @return
     */
    @PostMapping("/order/adminUpdateOrder")
    public String adminUpdateOrderStatus(OrderVo orderVo){
        Order order = orderService.getOrderById(orderVo.getOrderId());
        Integer is_update = null;
        if(orderVo.getStatus() == 2){
            Long oneDay = Long.valueOf(24*60*60*1000);
            System.out.println(new Date().getTime());
            System.out.println(order.getSendTime().getTime());
            System.out.println("========================");
            Long day = (new Date().getTime() - order.getSendTime().getTime())/oneDay;
            if(day >= 14){
                is_update = orderManageService.updateOrderStatus(orderVo);
                if(is_update != null && is_update >0 ){
                    return "1";//成功
                }else {
                    return "0";//失败
                }
            }else {
                return "2";//权限确认收货
            }
        }else if(orderVo.getStatus() == 1){
            if(order.getStatus() == 0){
                orderVo.setSendTime(new Date());
                is_update = orderManageService.updateOrderStatus(orderVo);
                if(is_update != null && is_update >0 ){
                    return "1";//成功
                }else {
                    return "0";//失败
                }
            }else{
                return "0";
            }

        }else if(orderVo.getStatus() == 3){
            if(order.getStatus() == 0){
                orderVo.setCancelTime(new Date());
                is_update = orderManageService.updateOrderStatus(orderVo);
                if(is_update != null && is_update >0 ){
                    return "1";//成功
                }else {
                    return "0";//失败
                }
            }else{
                return "0";
            }
        }else{
            return "0";
        }
    }


    /**
     * 查看订单详情
     * @return
     */
    @RequestMapping("/order/orderDetail/{orderId}")
    public ModelAndView getAllOrderByCondition(@PathVariable Long orderId){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("admin/order_detail");
        OrderVo orderVo = new OrderVo();
        orderVo.setOrderId(orderId);
        orderVo = orderManageService.getOrderByOrderId(orderVo);
        Address address = new Address();
        address.setAddressId(orderVo.getReceiveAddress());
        address = addressService.getAddressById(address);
        orderVo.setAddress(address);
        mv.addObject("orderVo",orderVo);
        return mv;
    }

}

