package com.sto.mdm.domain.mdm.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.sto.mdm.domain.mdm.entity.MdmType;

public record MdmSearchDto(
	String opinion1,
	String opinion2,
	Integer count1,
	Integer count2,
	Integer vote,
	MdmType type,
	String nickname,
	List<String> tags,
	LocalDateTime createdAt,
	List<String> images
) {
}
