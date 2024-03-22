package com.sto.mdm.domain.quiz.dto;

import com.sto.mdm.domain.quiz.entity.Quiz;
import com.sto.mdm.domain.quiz.entity.Submit;

public record SubmitDto(
	boolean correct
) {

	public Submit toEntity(Quiz quiz) {
		return Submit.builder()
			.correct(correct)
			.quiz(quiz)
			.build();
	}
}
