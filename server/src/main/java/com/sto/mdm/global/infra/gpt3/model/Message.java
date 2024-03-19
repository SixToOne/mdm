package com.sto.mdm.global.infra.gpt3.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Message {

	private String content;

	private String role;

	public Message(String role, String prompt) {
		this.role = role;
		this.content = prompt;
	}
}
