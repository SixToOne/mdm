package com.sto.mdm.domain.quiz.controller;

import org.springframework.data.domain.Pageable;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sto.mdm.domain.quiz.dto.FeedResponseDto;
import com.sto.mdm.domain.quiz.service.QuizService;
import com.sto.mdm.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feed")
public class FeedController {
	private final QuizService quizService;

	@GetMapping
	ResponseEntity<BaseResponse<FeedResponseDto>> getFeed(Pageable pageable){
		return ResponseEntity.ok(new BaseResponse<>(200,"success",quizService.getFeed(pageable)));
	}
}
