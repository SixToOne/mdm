package com.sto.mdm.global.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.http.codec.xml.Jaxb2XmlDecoder;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.netty.http.client.HttpClient;

@Configuration
public class DictionaryConfig {

	@Bean
	@Qualifier("dictionaryWebClient")
	public WebClient dictionaryWebClient() {

		return WebClient.builder()
			.clientConnector(new ReactorClientHttpConnector(HttpClient.create().secure()))
			.exchangeStrategies(
				ExchangeStrategies.builder()
					.codecs(configurer ->
						configurer.defaultCodecs().jaxb2Decoder(new Jaxb2XmlDecoder())
					)
					.build()
			)
			.build();
	}
}