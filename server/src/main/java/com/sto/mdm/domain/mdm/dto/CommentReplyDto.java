package com.sto.mdm.domain.mdm.dto;

import java.time.LocalDateTime;

public record CommentReplyDto(
	Long replyCount,
	Long commentId,
	String content,
	String nickname,
	long like,
	boolean liked,
	LocalDateTime createdAt
) {
}
