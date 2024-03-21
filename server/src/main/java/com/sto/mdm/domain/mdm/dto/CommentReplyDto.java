package com.sto.mdm.domain.mdm.dto;

import java.util.List;

public record CommentReplyDto(
	Long commentId,
	String content,
	String nickname,
	String password,
	List<CommentDto> replies
) {
}
