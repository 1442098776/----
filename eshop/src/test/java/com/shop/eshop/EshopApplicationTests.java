package com.shop.eshop;

import com.shop.eshop.util.StringUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EshopApplicationTests {

	@Test
	public void contextLoads() {
		String p = StringUtil.MD5Encode("123");
		System.out.println(p+",P");
	}

}
