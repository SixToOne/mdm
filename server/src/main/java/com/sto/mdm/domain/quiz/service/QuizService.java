package com.sto.mdm.domain.quiz.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sto.mdm.domain.quiz.dto.QuizDto;
import com.sto.mdm.domain.quiz.dto.QuizTagDto;
import com.sto.mdm.domain.quiz.entity.Quiz;
import com.sto.mdm.domain.quiz.entity.Submit;
import com.sto.mdm.domain.quiz.repository.QuizRepository;
import com.sto.mdm.domain.quiz.repository.QuizTagRepository;
import com.sto.mdm.domain.quiz.repository.SubmitRepository;
import com.sto.mdm.domain.tag.repository.TagRepository;
import com.sto.mdm.global.infra.gpt3.GptClient;
import com.sto.mdm.global.response.BaseException;
import com.sto.mdm.global.response.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class QuizService {

	private final QuizRepository quizRepository;
	private final GptClient gptService;
	private final TagRepository tagRepository;
	private final QuizTagRepository quizTagRepository;
	private final SubmitRepository submitRepository;

	public QuizDto getQuizDetail(long quizId) {
		//퀴즈 상세
		Quiz quiz = quizRepository.findById(quizId)
			.orElseThrow(() -> new BaseException(ErrorCode.QUIZ_NOT_FOUND));
		//퀴즈 정답률
		List<Submit> submits = submitRepository.findByQuizId(quiz.getId());
		List<Submit> correct = submitRepository.findByQuizIdAndCorrectIsTrue(quiz.getId());
		double rate = submits.isEmpty() ? 100.0 : ((double)correct.size() / submits.size() * 100);
		//퀴즈 태그
		List<String> tags = quizTagRepository.findAllByQuizId(quiz.getId())
			.stream()
			.map(QuizTagDto::of)
			.map(QuizTagDto::getTagName)
			.collect(Collectors.toList());

		return QuizDto.builder()
			.id(quizId)
			.question(quiz.getQuestion())
			.example1(quiz.getExample1())
			.example2(quiz.getExample2())
			.example3(quiz.getExample3())
			.example4(quiz.getExample4())
			.answer(quiz.getAnswer())
			.solution(quiz.getSolution())
			.rate(rate)
			.tags(tags)
			.build();
	}
}
