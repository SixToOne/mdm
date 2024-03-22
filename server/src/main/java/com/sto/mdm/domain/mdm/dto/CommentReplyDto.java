package com.sto.mdm.domain.mdm.dto;

public record CommentReplyDto(
	Long commentId,
	String content,
	String nickname,
	String password,
	int like
) {
}
