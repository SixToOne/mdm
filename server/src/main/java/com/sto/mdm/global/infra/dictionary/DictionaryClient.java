package com.sto.mdm.global.infra.dictionary;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.sto.mdm.domain.search.dto.DictionaryResponseDto;
import com.sto.mdm.global.infra.dictionary.model.Dictionary;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DictionaryClient {

	@Qualifier("dictionaryWebClient")
	@Autowired
	private WebClient dictionaryWebClient;

	@Value("${dictionary.api.key}")
	private String apiKey;

	@Value("${dictionary.api.url}")
	private String apiUrl;

	public List<DictionaryResponseDto> findDictionary(String word) {

		// API 요청 및 응답 처리
		Dictionary response = WebClient.create()
			.get()
			.uri(apiUrl + "?key=" + apiKey + "&q=" + word)
			.accept(MediaType.APPLICATION_XML)
			.retrieve()
			.bodyToMono(Dictionary.class)
			.block();

		// 응답이 null이 아닌지 확인하고 처리
		if (response == null) {
			throw new RuntimeException("API response is null");
		}

		// 응답에서 최대 3개의 결과 추출
		List<DictionaryResponseDto> list = new ArrayList<>();
		int maxResults = Math.min(3, response.getItem().size());
		for (int i = 0; i < maxResults; i++) {
			String title = response.getItem().get(i).getWord();
			String definition = response.getItem().get(i).getSense().getDefinition();
			list.add(new DictionaryResponseDto(title, definition));
		}
		return list;
	}
}
