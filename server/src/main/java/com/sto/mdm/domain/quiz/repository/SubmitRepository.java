package com.sto.mdm.domain.quiz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.quiz.entity.Submit;

public interface SubmitRepository extends JpaRepository<Submit, Long> {

	List<Submit> findAll();

	List<Submit> findByQuizId(Long id);

	List<Submit> findByQuizIdAndCorrectIsTrue(Long id);
}
