package com.sto.mdm.domain.search.service;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sto.mdm.domain.search.dto.TagResponseDto;
import com.sto.mdm.domain.tag.repository.TagRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class SearchService {

	private final TagRepository tagRepository;

	//관련 태그 찾기
	public TagResponseDto getTag(String keyword) {

		List<String> tags = tagRepository.searchTag(keyword);
		if (keyword.isEmpty()) {
			tags = Collections.emptyList();
		}
		return new TagResponseDto(tags);
	}

}
