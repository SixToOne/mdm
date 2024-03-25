package com.sto.mdm.global.util;

import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class IpUtil {
	public static String getClientIP(HttpServletRequest request) {
		String[] headers = {
			"Proxy-Client-IP",
			"WL-Proxy-Client-IP",
			"HTTP_CLIENT_IP",
			"HTTP_X_FORWARDED_FOR",
			"X-Real-IP",
			"X-RealIP",
			"REMOTE_ADDR"};

		String ip = request.getHeader("X-Forwarded-For");

		for (String header : headers) {
			if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
				ip = request.getHeader(header);
			}
		}

		if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}

		if (ip.equals("0:0:0:0:0:0:0:1")) {
			ip = "127.0.0.1";
		}

		return ip;
	}
}
