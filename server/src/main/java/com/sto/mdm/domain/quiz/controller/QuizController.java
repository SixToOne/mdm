package com.sto.mdm.domain.quiz.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sto.mdm.domain.quiz.dto.QuizConnectMdmDto;
import com.sto.mdm.domain.quiz.dto.QuizDto;
import com.sto.mdm.domain.quiz.dto.SolutionResponseDto;
import com.sto.mdm.domain.quiz.dto.SubmitDto;
import com.sto.mdm.domain.quiz.service.QuizService;
import com.sto.mdm.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RequestMapping("/quizs")
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class QuizController {
	private final QuizService quizService;

	//퀴즈 상세
	@GetMapping("/{quizId}")
	ResponseEntity<BaseResponse<QuizDto>> getQuizDetail(@PathVariable int quizId) {
		QuizDto quizDetail = quizService.getQuizDetail(quizId);
		return ResponseEntity.ok(new BaseResponse<>(HttpStatus.OK.value(), "success", quizDetail));
	}

	//퀴즈 상세 연관 몇대몇
	@GetMapping("/{quizId}/mdms")
	ResponseEntity<BaseResponse<List<QuizConnectMdmDto>>> getQuizDetailConnectMdm(@PathVariable int quizId) {
		List<QuizConnectMdmDto> list = quizService.getQuizDetailConnectMdm(quizId);
		return ResponseEntity.ok(new BaseResponse<>(HttpStatus.OK.value(), "success", list));
	}

	//퀴즈 정답 제출
	@PostMapping("/{quizId}/submit")
	ResponseEntity<BaseResponse<String>> getQuizSubmit(@PathVariable int quizId, @RequestBody SubmitDto submitValue) {
		quizService.submitQuizAnswer(quizId, submitValue);
		return ResponseEntity.ok(new BaseResponse<>(HttpStatus.OK.value(), "success", null));
	}

	//퀴즈 해설
	@GetMapping("/{quizId}/solution")
	ResponseEntity<BaseResponse<SolutionResponseDto>> getQuizSolution(@PathVariable int quizId) {
		quizService.submitQuizSolution(quizId);
		return ResponseEntity.ok(
			new BaseResponse<>(HttpStatus.OK.value(), "success", quizService.submitQuizSolution(quizId)));
	}

	//퀴즈 검색
	@GetMapping("/search")
	ResponseEntity<BaseResponse<List<QuizDto>>> searchQuiz(@RequestParam String keyword) {
		return ResponseEntity.ok(new BaseResponse<>(200, "success", quizService.searchQuiz(keyword)));
	}
}
