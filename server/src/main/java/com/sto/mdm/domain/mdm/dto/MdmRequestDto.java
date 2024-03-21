package com.sto.mdm.domain.mdm.dto;

import java.util.List;
import java.util.Set;

import com.sto.mdm.domain.mdm.entity.Mdm;
import com.sto.mdm.domain.mdm.entity.MdmType;

public record MdmRequestDto(
	String title,
	String content,
	String opinion1,
	String opinion2,
	MdmType type,
	String nickname,
	String password,
	Set<String> tags
) {
	public Mdm toEntity() {
		return Mdm.builder()
			.title(title)
			.content(content)
			.opinion1(opinion1)
			.opinion2(opinion2)
			.type(type)
			.nickname(nickname)
			.password(password)
			.build();
	}

	public void addTags(List<String> tags) {
		this.tags.addAll(tags);
	}
}
