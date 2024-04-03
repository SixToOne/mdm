package com.sto.mdm.domain.quiz.dto;

import java.util.List;

public record QuizFeedResponseDto(
	List<QuizDto> quizFeeds
) {
}
