package com.sto.mdm.global.infra.gpt3.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ChatRequest {

	private String model;
	private List<Message> messages;
	private double temperature;
	private double top_p;

	public ChatRequest(String model, String system, String prompt, double temperature, double top_p) {
		this.model = model;
		this.messages = new ArrayList<>();
		this.messages.add(new Message("system", system));
		this.messages.add(new Message("user", prompt));
		this.temperature = temperature;
		this.top_p = top_p;
	}

}
