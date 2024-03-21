package com.sto.mdm.domain.quiz.service;

import java.util.List;
import java.util.StringTokenizer;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sto.mdm.domain.quiz.dto.QuizDto;
import com.sto.mdm.domain.quiz.entity.Quiz;
import com.sto.mdm.domain.quiz.entity.QuizTag;
import com.sto.mdm.domain.quiz.repository.QuizRepository;
import com.sto.mdm.domain.quiz.repository.QuizTagRepository;
import com.sto.mdm.domain.tag.entity.Tag;
import com.sto.mdm.domain.tag.repository.TagRepository;
import com.sto.mdm.global.infra.gpt3.GptClient;
import com.sto.mdm.global.response.BaseException;
import com.sto.mdm.global.response.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class GptService {
	private final QuizRepository quizRepository;
	private final GptClient gptService;
	private final TagRepository tagRepository;
	private final QuizTagRepository quizTagRepository;

	@Transactional
	public void getQuizSolution() {
		List<QuizDto> quizzes = quizRepository.findAll().stream()
			.map(QuizDto::of).toList();
		System.out.println(quizzes);
		// for (QuizDto quizDto : quizzes) {
		for (int i = 50; i < 100; i++) {
			QuizDto quizDto = quizzes.get(i);
			Long id = quizDto.getId();
			String question = quizDto.getQuestion();
			String answer = quizDto.getAnswer();
			String solution = gptService.generateSolution(question, answer);
			Quiz quiz = quizRepository.findById(id)
				.orElseThrow(() -> new BaseException(ErrorCode.QUIZ_NOT_FOUND));
			quiz.setSolution(solution);
		}
	}

	@Transactional
	public void getQuizKeyword() {
		List<QuizDto> quizzes = quizRepository.findAll().stream()
			.map(QuizDto::of).toList();

		// for (QuizDto quizDto : quizzes) {
		for (int i = 100; i < 200; i++) {
			QuizDto quizDto = quizzes.get(i);
			String question = quizDto.getQuestion();
			String generateKeyword = gptService.generateSolutionKeyword(question);
			StringTokenizer st = new StringTokenizer(generateKeyword, ", ");

			int count = 4;
			while (count-- > 0) {
				String keyword = st.nextToken();
				Tag tag = tagRepository.findByName(keyword)
					.orElseGet(() -> tagRepository.save(Tag.builder().name(keyword).build()));
				QuizTag quizTag = QuizTag.builder()
					.quiz(quizDto.toEntity())
					.tag(tag)
					.build();

				quizTagRepository.save(quizTag);
			}
		}
	}
}
