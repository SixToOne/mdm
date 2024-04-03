package com.sto.mdm.global.infra.gpt3.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Choice {

	private String finishReason;
	private int index;
	private Message message;
}
