package com.sto.mdm.domain.mdm.dto;

import java.util.List;

import com.sto.mdm.domain.mdm.entity.MdmType;

public record MdmUpdateRequestDto(
	String title,
	String content,
	String opinion1,
	String opinion2,
	MdmType type,
	String nickname,
	String password,
	List<String> tags
) {
}
