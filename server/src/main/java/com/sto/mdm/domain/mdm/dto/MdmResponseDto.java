package com.sto.mdm.domain.mdm.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.sto.mdm.domain.mdm.entity.MdmType;

public record MdmResponseDto(
	Long mdmId,
	String title,
	String content,
	Opinion opinion1,
	Opinion opinion2,
	Integer vote,
	int views,
	MdmType type,
	String nickname,
	List<String> tags,
	List<String> images,
	long commentCount,
	LocalDateTime createdAt

) {
}
