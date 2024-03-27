package com.sto.mdm.domain.search.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sto.mdm.domain.search.dto.TagResponseDto;
import com.sto.mdm.domain.search.service.SearchService;
import com.sto.mdm.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RequestMapping("/api/search")
@RestController
@Slf4j
public class SearchController {
	private final SearchService searchService;

	//퀴즈 상세
	@GetMapping("/tag")
	ResponseEntity<BaseResponse<TagResponseDto>> getTag(@RequestParam(required = false) String keyword) {

		return ResponseEntity.ok(new BaseResponse<>(HttpStatus.OK.value(), "success", searchService.getTag(keyword)));
	}
}
