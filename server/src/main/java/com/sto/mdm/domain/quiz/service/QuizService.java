package com.sto.mdm.domain.quiz.service;

import static java.util.stream.Collectors.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.sto.mdm.domain.mdm.entity.MdmTag;
import com.sto.mdm.domain.mdm.repository.MdmRepository;
import com.sto.mdm.domain.mdm.repository.MdmTagRepository;
import com.sto.mdm.domain.quiz.dto.QuizConnectMdmDto;
import com.sto.mdm.domain.quiz.dto.QuizDto;
import com.sto.mdm.domain.quiz.dto.QuizTagDto;
import com.sto.mdm.domain.quiz.entity.Quiz;
import com.sto.mdm.domain.quiz.entity.Submit;
import com.sto.mdm.domain.quiz.repository.QuizRepository;
import com.sto.mdm.domain.quiz.repository.QuizTagRepository;
import com.sto.mdm.domain.quiz.repository.SubmitRepository;
import com.sto.mdm.domain.tag.entity.Tag;
import com.sto.mdm.domain.tag.repository.TagRepository;
import com.sto.mdm.global.response.BaseException;
import com.sto.mdm.global.response.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class QuizService {

	private final QuizRepository quizRepository;
	private final QuizTagRepository quizTagRepository;
	private final SubmitRepository submitRepository;
	private final MdmRepository mdmRepository;
	private final MdmTagRepository mdmTagRepository;
	private final TagRepository tagRepository;

	public List<QuizConnectMdmDto> getQuizDetailConnectMdm(long quizId) {
		// 퀴즈에 관한 연관 태그를 가져옴
		Quiz quiz = quizRepository.findById(quizId)
			.orElseThrow(() -> new BaseException(ErrorCode.QUIZ_NOT_FOUND));
		//퀴즈 태그
		List<Long> tagIds = quizTagRepository.findAllByQuizId(quiz.getId())
			.stream()
			.map(QuizTagDto::of)
			.map(QuizTagDto::getTagId)
			.toList();
		// 퀴즈 태그와 같은 MDM 태그 추출
		Set<Long> mdmTagIds = new HashSet<>();
		for (Long tagId : tagIds) {
			List<MdmTag> mdmTags = mdmTagRepository.findByTagId(tagId);
			for (MdmTag mdmTag : mdmTags) {
				mdmTagIds.add(mdmTag.getMdm().getId());
			}
		}
		List<String> tags = new ArrayList<>();
		for (Long id : tagIds) {
			Tag tag = tagRepository.findById(id).orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));
			tags.add(tag.getName());
		}
		//MDM 아이디로 같은 게시물 찾기
		List<QuizConnectMdmDto> relatedPosts = mdmRepository.findAllById(mdmTagIds)
			.stream()
			.map(mdm -> QuizConnectMdmDto.builder()
				.title(mdm.getTitle())
				.vote(mdm.getVote())
				.tags(tags)
				.build()
			)
			.toList();
		//중복방지
		List<QuizConnectMdmDto> uniqueRelatedPosts = new ArrayList<>(new HashSet<>(relatedPosts));
		log.info(uniqueRelatedPosts.toString());
		return uniqueRelatedPosts;
	}

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
			.collect(toList());

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
