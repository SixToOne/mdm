package com.sto.mdm.domain.quiz.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sto.mdm.domain.quiz.entity.QuizTag;

public interface QuizTagRepository extends JpaRepository<QuizTag, Long> {

	List<QuizTag> findAllByQuizId(Long quizId);

	List<QuizTag> findByTagId(Long tagId);

	List<QuizTag> findByQuizId(Long tagId);

	@Query("SELECT COUNT(*) FROM QuizTag qt WHERE qt.tag.name = :tagName")
	Optional<Integer> findByTagCnt(String tagName);
}
