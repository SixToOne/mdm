package com.sto.mdm.domain.mdm.dto;

import java.time.LocalDateTime;

public record CommentReplyDto(
	Long commentId,
	String content,
	String nickname,
	String password,
	long like,
	LocalDateTime createdAt
) {
}
