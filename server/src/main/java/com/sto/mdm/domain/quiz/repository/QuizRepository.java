package com.sto.mdm.domain.quiz.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sto.mdm.domain.quiz.entity.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

	List<Quiz> findAll();

	Optional<Quiz> findById(Long id);

	Page<Quiz> findAll(Pageable pageable);
}
