package com.sto.mdm.domain.quiz.dto;

import com.sto.mdm.domain.quiz.entity.QuizTag;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizTagDto {

	private Long id;
	private Long quizId;
	private Long tagId;

	public static QuizTagDto of(QuizTag quizTag) {
		return QuizTagDto.builder()
			.id(quizTag.getId())
			.quizId(quizTag.getQuiz().getId())
			.tagId(quizTag.getTag().getId())
			.build();
	}
}
