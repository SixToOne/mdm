package com.sto.mdm.domain.mdm.dto;

import java.util.List;

public record MdmFeedResponseDto(
	List<MdmResponseDto> mdmFeeds
) {
}
