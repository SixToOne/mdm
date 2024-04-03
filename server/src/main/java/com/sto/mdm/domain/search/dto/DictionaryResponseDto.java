package com.sto.mdm.domain.search.dto;

import java.util.List;

public record DictionaryResponseDto(
	String title,
	Integer supNo,
	List<SenseResponseDto> senses
) {
}
