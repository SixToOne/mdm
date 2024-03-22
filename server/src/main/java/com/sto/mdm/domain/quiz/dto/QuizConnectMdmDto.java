package com.sto.mdm.domain.quiz.dto;

import java.util.List;

import com.sto.mdm.domain.mdm.entity.Mdm;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QuizConnectMdmDto {
	// private Long id;
	private String title;
	private double vote;
	private List<String> tags;

	public static QuizConnectMdmDto of(Mdm mdm) {
		return QuizConnectMdmDto.builder()
			.title(mdm.getTitle())
			.vote(mdm.getVote())
			.build();
	}
}
