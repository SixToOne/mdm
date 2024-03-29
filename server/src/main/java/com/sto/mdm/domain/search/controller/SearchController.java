package com.sto.mdm.domain.search.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sto.mdm.domain.search.dto.DictionaryResponseDto;
import com.sto.mdm.domain.search.dto.TagResponseDto;
import com.sto.mdm.domain.search.service.SearchService;
import com.sto.mdm.global.infra.dictionary.DictionaryClient;
import com.sto.mdm.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RequestMapping("/search")
@RestController
@Slf4j
public class SearchController {

	private final SearchService searchService;
	private final DictionaryClient dictionaryService;

	//태그 찾기
	@GetMapping("/tag")
	ResponseEntity<BaseResponse<TagResponseDto>> getTag(@RequestParam(required = false) String keyword) {

		return ResponseEntity.ok(new BaseResponse<>(HttpStatus.OK.value(), "success", searchService.getTag(keyword)));
	}

	//사전 검색
	@GetMapping("/dictionary")
	ResponseEntity<BaseResponse<List<DictionaryResponseDto>>> getDictionary(
		@RequestParam(required = false) String word) {

		return ResponseEntity.ok(
			new BaseResponse<>(HttpStatus.OK.value(), "success", dictionaryService.findDictionary(word)));
	}
}
