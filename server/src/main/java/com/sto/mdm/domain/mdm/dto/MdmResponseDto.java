package com.sto.mdm.domain.mdm.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.sto.mdm.domain.mdm.entity.MdmType;

public record MdmResponseDto(
	Long mdmId,
	String title,
	String content,
	String opinion1,
	String opinion2,
	String image1,
	String image2,
	int count1,
	int count2,
	int vote,

	MdmType type,
	String nickname,
	String password,
	List<String> tags,
	List<String> images,
	long commentCount,
	LocalDateTime createdAt

) {
}
