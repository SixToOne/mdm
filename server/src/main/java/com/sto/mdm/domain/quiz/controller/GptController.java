package com.sto.mdm.domain.quiz.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sto.mdm.domain.quiz.service.GptService;
import com.sto.mdm.global.infra.gpt3.GptClient;
import com.sto.mdm.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RequestMapping("/gpt")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@Slf4j
public class GptController {
	private final GptService qptService;
	private final GptClient gptClient;

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

	//게시글 키워드 추출
	@PostMapping("/mdmsKeyword")
	ResponseEntity<BaseResponse<String>> postMdmsKeyword() {
		log.info("gptMdmKeyword controller 들어오니");
		String answer = gptClient.generateMdmKeyword("\"안녕하세요. 현재 약 한 달 넘게 이성 친구와 교제 중입니다. "
			+ "저희는 점심이나 저녁 식사 같은 경우에는 각각 본인이 주문한 메뉴 가격을 계산을 합니다.\\n"
			+ "물론 이 점은 좋지만 이해가 되지 않는 점이 있습니다. "
			+ "예를 들자면 에버랜드 같은 곳으로 놀러갈 때는 이성 친구가 차량으로 태워주고, 티켓값은 제가 부담하라고 합니다."
			+ "\\n먼 길 태워주느라 정말 고맙지만 자동차 기름값을 언급하는 현 이성 친구.. "
			+ "계속 연인 관계로 가는 것이 맞을까요?\"");
		return ResponseEntity.ok(new BaseResponse<>(HttpStatus.OK.value(), "success", answer));
	}
}
