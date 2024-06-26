package com.sto.mdm.domain.quiz.entity;

import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.sto.mdm.domain.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE quiz SET deleted = true WHERE quiz_id = ?")
@SQLRestriction("deleted = false")
public class Quiz extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "quiz_id")
	private Long id;

	private String question;

	private String example1;

	private String example2;

	private String example3;

	private String example4;

	private String answer;

	private String solution;

	@OneToMany(mappedBy = "quiz")
	private List<QuizTag> quizTags;

	public void setSolution(String solution) {
		this.solution = solution;
	}
}
