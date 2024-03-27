package com.sto.mdm.domain.quiz.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sto.mdm.domain.quiz.service.GptService;
import com.sto.mdm.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RequestMapping("/gpt")
@RestController
@Slf4j
public class GptController {
	private final GptService qptService;

	//Test
	@PostMapping("/solution")
	ResponseEntity<BaseResponse<String>> postMdm() {
		qptService.getQuizSolution();
		return ResponseEntity.ok(new BaseResponse<>(HttpStatus.OK.value(), "success", null));
	}

	//문제 키워드 추출
	@PostMapping("/keyword")
	ResponseEntity<BaseResponse<String>> postKeyword() {
		qptService.getQuizKeyword();
		return ResponseEntity.ok(new BaseResponse<>(HttpStatus.OK.value(), "success", null));
	}
}
