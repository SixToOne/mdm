package com.sto.mdm.domain.quiz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.quiz.entity.QuizTag;

public interface QuizTagRepository extends JpaRepository<QuizTag, Long> {

	List<QuizTag> findAllByQuizId(Long quizId);

	List<QuizTag> findByTagId(Long tagId);

	List<QuizTag> findByQuizId(Long tagId);
}
