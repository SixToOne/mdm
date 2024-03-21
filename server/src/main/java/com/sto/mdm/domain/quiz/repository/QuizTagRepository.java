package com.sto.mdm.domain.quiz.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.quiz.entity.QuizTag;

public interface QuizTagRepository extends JpaRepository<QuizTag, Long> {

	Optional<QuizTag> findById(Long id);

	List<QuizTag> findAllByQuizId(Long quizId);

}
