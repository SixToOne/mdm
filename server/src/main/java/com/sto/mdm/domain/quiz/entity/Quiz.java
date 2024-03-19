package com.sto.mdm.domain.quiz.entity;

import com.sto.mdm.domain.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Quiz extends BaseEntity {

	@Id
	@GeneratedValue
	@Column(name = "quiz_id")
	private Long id;

	private String question;

	private String example1;

	private String example2;

	private String example3;

	private String example4;

	private String answer;

	private String solution;

}
