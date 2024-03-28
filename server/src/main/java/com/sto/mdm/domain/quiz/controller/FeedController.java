package com.sto.mdm.domain.quiz.controller;

import org.springframework.data.domain.Pageable;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sto.mdm.domain.mdm.dto.MdmFeedResponseDto;
import com.sto.mdm.domain.mdm.service.MdmService;
import com.sto.mdm.domain.quiz.dto.QuizFeedResponseDto;
import com.sto.mdm.domain.quiz.service.QuizService;
import com.sto.mdm.global.response.BaseResponse;
import com.sto.mdm.global.util.IpUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/feed")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FeedController {
	private final QuizService quizService;
	private final MdmService mdmService;

	@GetMapping("/quizfeed")
	ResponseEntity<BaseResponse<QuizFeedResponseDto>> getQuizFeed(Pageable pageable) {
		return ResponseEntity.ok(new BaseResponse<>(200, "success", quizService.getQuizFeed(pageable)));
	}
	@GetMapping("/mdmfeed")
	ResponseEntity<BaseResponse<MdmFeedResponseDto>> getMdmFeed(HttpServletRequest request,Pageable pageable) {
		String ip = IpUtil.getClientIP(request);
		return ResponseEntity.ok(new BaseResponse<>(200, "success", mdmService.getMdmFeed(ip,pageable)));
	}
}
