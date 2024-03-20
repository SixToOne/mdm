package com.sto.mdm.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

	INTERNAL_SERVER_ERROR(500, "COMMON-002", "서버에서 처리할 수 없는 경우"),
	MDM_NOT_FOUND(404, "MDM-001", "MDM 정보를 찾을 수 없는 경우");

	private final int status;
	private final String code;
	private final String message;

}
