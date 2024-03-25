package com.sto.mdm.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

	INTERNAL_SERVER_ERROR(500, "COMMON-002", "서버에서 처리할 수 없는 경우"),
	QUIZ_NOT_FOUND(404, "QUIZ_NOT_FOUND", "퀴즈를 찾을 수 없는 경우"),
	MDM_NOT_FOUND(404, "MDM-001", "MDM 정보를 찾을 수 없는 경우"),
	TAG_NOT_FOUND(404, "TAG_NOT_FOUND", "태그 정보를 찾을 수 없는 경우"),
	COMMENT_NOT_FOUND(404, "COMMENT-001", "댓글을 찾을 수 없는 경우");

	private final int status;
	private final String code;
	private final String message;

}
