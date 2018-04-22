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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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
    /**
     * 产生订单
     * @return
     */
    @PostMapping("/order/createOrder")
    public String createOrder(SureBuy sureBuy, HttpServletRequest request){
        User user = (User) request.getSession().getAttribute("user");

        Calendar calendar = Calendar.getInstance();
        //生成订单号** 用户id+年月日时分+6位数
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
            //产生9位的随机数
            long orderIdstr2 = (long) (Math.random()*1000000000);
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
     * 更新订单信息
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
}
