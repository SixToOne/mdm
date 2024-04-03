package com.sto.mdm.domain.mdm.dto;

import com.sto.mdm.domain.mdm.entity.Comment;

public record CommentDto(
	Long commentId,
	String content,
	String nickname,
	String password
) {
	public Comment toEntity() {
		return Comment.builder()
			.content(content)
			.nickname(nickname)
			.password(password)
			.build();
	}
}
