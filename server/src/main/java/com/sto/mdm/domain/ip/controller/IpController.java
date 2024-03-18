package com.sto.mdm.domain.ip.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IpController {
	@GetMapping("/test")
	public String test() {
		return "test";
	}
}
