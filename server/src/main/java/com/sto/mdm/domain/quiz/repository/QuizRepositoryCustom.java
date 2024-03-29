package com.sto.mdm.domain.quiz.repository;

import java.util.List;

import com.sto.mdm.domain.quiz.dto.RelatedQuizDto;

public interface QuizRepositoryCustom {

	List<RelatedQuizDto> findAllByTagsId(List<Long> tags);

	List<Long> findAllRelatedId(List<Long> tags);
}
