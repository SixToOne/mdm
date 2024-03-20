package com.sto.mdm.global.infra.gpt3;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sto.mdm.global.infra.gpt3.model.ChatRequest;
import com.sto.mdm.global.infra.gpt3.model.ChatResponse;
import com.sto.mdm.global.response.BaseException;
import com.sto.mdm.global.response.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class GptClient {
	@Qualifier("openaiRestTemplate")
	private final RestTemplate restTemplate;
	@Value("${openai.model}")
	private String model;
	@Value("${openai.api.url}")
	private String apiUrl;

	//해설 추출
	public String generateSolution(String question, String answer) {
		double temperature = 0.3;
		double top_p = 1;
		String system = "너의 직업은 경제/경영 전문가 이야. 최대 5줄로 해석 해야해.";
		String user = "문제는 다음과 같아. " + question + "해당의 답은" + answer + "이야. 문제에 대한 해설을 부탁해.";

		return chatCompletions(model, system, user, temperature, top_p);
	}

	//문제 키워드 추출
	public String generateSolutionKeyword(String question) {
		double temperature = 0.3;
		double top_p = 1;
		String system = "너는 문제를 읽고 키워드를 4개만 뽑아야해. 키워드 형식은 00, 00, 00, 00 이렇게 부탁해. 문제는 다음과 같아." + question;
		String user = "문제에 대한 키워드 추출 4개만 부탁해.";
		return chatCompletions(model, system, user, temperature, top_p);
	}

	//게시판 키워드 추출
	public String generateMdmKeyword(String mdm) {
		double temperature = 0.3;
		double top_p = 1;
		String system = "너는 게시글을 읽고 키워드를 4개만 뽑아야해. 키워드 형식은 00, 00, 00, 00 이렇게 부탁해. 게시글은 다음과 같아." + mdm;
		String user = "게시글에 대한 키워드 추출 4개만 부탁해.";
		return chatCompletions(model, system, user, temperature, top_p);
	}

	public String chatCompletions(String model, String system, String message, double temperature, double top_p) {
		try {
			log.info("에러가 어디서");
			ChatRequest request = new ChatRequest(model, system, message, temperature, top_p);
			ChatResponse response = restTemplate.postForObject(apiUrl, request, ChatResponse.class);
			assert response != null;
			log.info("response: " + response);
			if (response.getChoices() == null || response.getChoices().isEmpty()) {
				throw new BaseException(ErrorCode.INTERNAL_SERVER_ERROR);
			}
			return response.getChoices().get(0).getMessage().getContent();
		} catch (Exception e) {
			throw new BaseException(ErrorCode.INTERNAL_SERVER_ERROR);
		}
	}
}
