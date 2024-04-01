package com.sto.mdm.domain.mdm.dto;

import java.util.List;

public record CommentReplyResponseDto(
	Long totalCount,
	List<CommentReplyDto> comments
) {
}
