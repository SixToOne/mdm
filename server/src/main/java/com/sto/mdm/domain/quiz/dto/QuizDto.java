package com.sto.mdm.domain.quiz.dto;

import com.sto.mdm.domain.quiz.entity.Quiz;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizDto {
	private Long id;

	private String question;

	private String example1;

	private String example2;

	private String example3;

	private String example4;

	private String answer;

	private String solution;

	public static QuizDto of(Quiz quiz) {
		return QuizDto.builder()
			.id(quiz.getId())
			.question(quiz.getQuestion())
			.example1(quiz.getExample1())
			.example2(quiz.getExample2())
			.example4(quiz.getExample3())
			.answer(quiz.getAnswer())
			.solution(quiz.getSolution())
			.build();
	}

	public Quiz toEntity() {
		return Quiz.builder()
			.id(id)
			.question(question)
			.example1(example1)
			.example2(example2)
			.example3(example3)
			.example4(example4)
			.answer(answer)
			.solution(solution)
			.build();
	}
}
