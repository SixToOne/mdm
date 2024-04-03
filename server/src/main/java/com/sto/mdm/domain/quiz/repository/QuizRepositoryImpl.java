package com.sto.mdm.domain.quiz.repository;

import static com.querydsl.core.group.GroupBy.*;
import static com.sto.mdm.domain.quiz.entity.QQuiz.*;
import static com.sto.mdm.domain.quiz.entity.QQuizTag.*;
import static com.sto.mdm.domain.quiz.entity.QSubmit.*;
import static com.sto.mdm.domain.tag.entity.QTag.*;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sto.mdm.domain.quiz.dto.RelatedQuizDto;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class QuizRepositoryImpl implements QuizRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public List<RelatedQuizDto> findAllByTagsId(List<Long> ids) {
		return queryFactory
			.select(quiz)
			.from(quiz)
			.leftJoin(quiz.quizTags, quizTag)
			.leftJoin(quizTag.tag, tag)
			.where(quiz.id.in(ids))
			.distinct()
			.transform(
				groupBy(quiz.id)
					.list(Projections.constructor(
							RelatedQuizDto.class,
							quiz.id,
							quiz.question,
							JPAExpressions
								.select(submit.count())
								.from(submit)
								.where(submit.quiz.eq(quiz),
									submit.correct.isTrue()),
							JPAExpressions
								.select(submit.count())
								.from(submit)
								.where(submit.quiz.eq(quiz)),
							list(tag.name)
						)
					)).stream().limit(4).toList();
	}

	@Override
	public List<Long> findAllRelatedId(List<Long> tags) {
		return queryFactory
			.select(quiz.id)
			.from(quiz)
			.leftJoin(quiz.quizTags, quizTag)
			.leftJoin(quizTag.tag, tag)
			.where(tag.id.in(tags))
			.distinct()
			.fetch();
	}
}

