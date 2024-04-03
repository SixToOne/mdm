package com.sto.mdm.global.infra.gpt3.model;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatResponse {
	private List<Choice> choices;
}
