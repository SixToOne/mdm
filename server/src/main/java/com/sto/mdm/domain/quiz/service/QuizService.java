package com.sto.mdm.domain.quiz.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sto.mdm.domain.quiz.dto.QuizDto;
import com.sto.mdm.domain.quiz.entity.Quiz;
import com.sto.mdm.domain.quiz.repository.QuizRepository;
import com.sto.mdm.global.infra.gpt3.GptClient;
import com.sto.mdm.global.response.BaseException;
import com.sto.mdm.global.response.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QuizService {

	private final QuizRepository quizRepository;
	private final GptClient gptService;

	@Transactional
	public void getQuizSolution() {

		List<QuizDto> quizzes = quizRepository.findAll().stream()
			.map(QuizDto::of).toList();
		for (QuizDto quizDto : quizzes) {
			Long id = quizDto.getId();
			String question = quizDto.getQuestion();
			String answer = quizDto.getAnswer();
			String solution = gptService.generateSolution(question, answer);

			Quiz quiz = quizRepository.findById(id)
				.orElseThrow(() -> new BaseException(ErrorCode.QUIZ_NOT_FOUND));
			quiz.setSolution(solution);
		}
	}

}
