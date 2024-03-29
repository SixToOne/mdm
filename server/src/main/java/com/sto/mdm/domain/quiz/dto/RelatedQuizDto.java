package com.sto.mdm.domain.quiz.dto;

import java.util.List;

public record RelatedQuizDto(
	Long id,
	String question,

	Long correct,
	Long submit,
	List<String> tags
) {
}
