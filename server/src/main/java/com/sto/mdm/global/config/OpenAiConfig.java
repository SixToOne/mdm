package com.sto.mdm.global.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class OpenAiConfig {

	@Value("${openai.api.key}")
	private String openaiApiKey;

	@Bean
	@Qualifier("openaiRestTemplate")
	public RestTemplate openaiRestTemplate() {

		RestTemplate restTemplate = new RestTemplate(); //인스턴스 생성
		restTemplate.getInterceptors().add((request, body, execution) -> { //인증
			request.getHeaders().add("Authorization", "Bearer " + openaiApiKey);
			return execution.execute(request, body); //실제 http 요청을 실행하도록 객체에게 제어 전달
		});
		return restTemplate;

	}
}