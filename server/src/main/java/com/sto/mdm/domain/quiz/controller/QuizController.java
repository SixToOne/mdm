package com.sto.mdm.domain.quiz.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sto.mdm.domain.quiz.service.QuizService;
import com.sto.mdm.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RequestMapping("/api/quiz")
@RestController
@Slf4j
public class QuizController {
	private final QuizService quizService;

	//Test
	@PostMapping("/solution")
	ResponseEntity<BaseResponse<String>> postMdm() {
		quizService.getQuizSolution();
		return ResponseEntity.ok(new BaseResponse<>(HttpStatus.OK.value(), "success", null));
	}

	@PostMapping("/keyword")
	ResponseEntity<BaseResponse<String>> postKeyword() {
		quizService.getQuizKeyword();
		return ResponseEntity.ok(new BaseResponse<>(HttpStatus.OK.value(), "success", null));
	}

}
