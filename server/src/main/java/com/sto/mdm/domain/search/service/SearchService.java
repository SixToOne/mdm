package com.sto.mdm.domain.search.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sto.mdm.domain.mdm.repository.MdmTagRepository;
import com.sto.mdm.domain.quiz.repository.QuizTagRepository;
import com.sto.mdm.domain.search.dto.TagListDto;
import com.sto.mdm.domain.search.dto.TagResponseDto;
import com.sto.mdm.domain.tag.repository.TagRepository;
import com.sto.mdm.global.response.BaseException;
import com.sto.mdm.global.response.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class SearchService {

	private final TagRepository tagRepository;
	private final QuizTagRepository quizTagRepository;
	private final MdmTagRepository mdmTagRepository;

	//관련 태그 찾기
	public TagListDto getTag(String keyword) {

		List<TagResponseDto> result = new ArrayList<>();
		List<String> tags = tagRepository.searchTag(keyword);
		if (keyword.isEmpty()) {
			tags = Collections.emptyList();
		} else {
			for (String tag : tags) {
				//퀴즈 태그 수
				int qCnt = quizTagRepository.findByTagCnt(tag)
					.orElseThrow(() -> new BaseException(ErrorCode.QUIZ_NOT_FOUND));
				//게시글 태그 수
				int mCnt = mdmTagRepository.findByTagCnt(tag)
					.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));
				result.add(new TagResponseDto(tag, qCnt + mCnt));
			}
		}
		return new TagListDto(result);
	}

}
