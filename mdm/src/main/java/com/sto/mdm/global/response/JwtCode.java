package com.sto.mdm.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum JwtCode {
	ACCESS(200, "JWT-001", "성공적으로 반환한 경우"),
	DENIED(400, "JWT-003", "잘못된 토큰인 경우"),
	EXPIRED(401, "JWT-001", "만료된 토큰인 경우");

	private final int status;
	private final String code;
	private final String message;
}
