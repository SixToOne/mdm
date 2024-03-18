package com.sto.mdm.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
	INVALID_INPUT_VALUE(400, "COMMON-001", "유효성 검증에 실패한 경우"),
	INTERNAL_SERVER_ERROR(500, "COMMON-002", "서버에서 처리할 수 없는 경우"),

	DUPLICATE_LOGIN_ID(400, "USER-001", "계정명이 중복된 경우"),
	UNAUTHORIZED(401, "USER-002", "인증에 실패한 경우"),
	UNAUTHORIZED_USER(403, "USER-003", "유저 권한이 없는 경우"),
	USER_NOT_FOUND(404, "USER-004", "유저를 찾을 수 없는 경우"),
	TOKEN_NOT_EXISTS(404, "USER-005", "토큰이 존재하지 않는 경우"),
	TOKEN_EXPIRED(403, "USER-006", "토큰이 만료된 경우"),

	EVENT_NOT_FOUND(404, "EVENT-001", "이벤트를 찾을 수 없는 경우"),

	REVIEW_NOT_FOUND(404, "REVIEW-001", "리뷰를 찾을 수 없는 경우"),

	DATA_CANT_SAVE(404, "S3-001", "데이터 저장에 실패 - 필드값 확인 OR 연관 엔티티 확인"),

	SHARE_NOT_FOUND(404, "SHARE-001", "이벤트를 찾을 수 없는 경우"),

	TRADE_NOT_FOUND(404, "DEAL-001", "교환을 찾을 수 없는 경우"),
	DEAL_NOT_FOUND(404, "DEAL-002", "교환 요청을 찾을 수 없는 경우"),

	USERCHAT_NOT_FOUND(404, "USERCHAT-001", "참여 기록을 찾을 수 없는 경우"),

	PARTY_NOT_FOUND(404, "PARTY-001", "모집을 찾을 수 없는 경우"),
	CHAT_FULL(400, "PARTY-002", "파티가 꽉 찬 경우"),

	CHAT_NOT_FOUND(404, "CHAT-001", "퀘스트을 찾을 수 없는 경우"),

	STAR_NOT_FOUND(404, "STAR-001", "해당 즐겨찾기가 없습니다"),
	STAR_DUPLICATED(404, "STAR-002", "이미 등록된 즐겨찾기 입니다"),

	HISTORY_NOT_FOUND(404, "HISTORY-001", "방문 기록을 찾을 수 없는 경우"),

	CELEBRITY_NOT_FOUND(404, "CELEBRITY-001", "연예인을 찾을 수 없는 경우"),

	FIREBASE_INTERRUPTED(500, "FIREBASE-001", "파이어베이스 메시지 전송 중단"),
	FIREBASE_EXECUTION(500, "FIREBASE-002", "파이어베이스 메시지 전송 중단"),
	CELEBRITY_USER_NOT_FOUND(404, "CELEBRITY-USER-001", "유저가 참여하지 않았을 경우");

	private final int status;
	private final String code;
	private final String message;

}
