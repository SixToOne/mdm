package com.sto.mdm.domain.quiz.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.quiz.entity.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

	List<Quiz> findAll();

	Optional<Quiz> findById(Long id);

}
