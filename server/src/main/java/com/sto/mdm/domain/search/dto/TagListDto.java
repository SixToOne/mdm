package com.sto.mdm.domain.search.dto;

import java.util.List;

public record TagListDto(
	List<TagResponseDto> tags
) {
}
