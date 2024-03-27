package com.sto.mdm.domain.mdm.repository;

import static com.sto.mdm.domain.ip.entity.QIp.*;
import static com.sto.mdm.domain.mdm.entity.QComment.*;
import static com.sto.mdm.domain.mdm.entity.QCommentLike.*;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sto.mdm.domain.mdm.dto.CommentReplyDto;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public List<CommentReplyDto> findByMdmIdAndParentIsNull(Long mdmId, String ip, Pageable pageable) {
		return queryFactory
			.select(Projections.constructor(CommentReplyDto.class,
				comment.id,
				comment.content,
				comment.nickname,
				comment.likeCount,
				JPAExpressions.select(commentLike.count().gt(0))
					.from(commentLike)
					.leftJoin(commentLike.ip, ip1)
					.where(
						ip1.ip.eq(ip),
						commentLike.comment.id.eq(comment.id)
					).exists().as("liked"),
				comment.createdAt))
			.from(comment)
			.where(comment.mdm.id.eq(mdmId), comment.parent.isNull())
			.orderBy(comment.createdAt.desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
	}

	@Override
	public List<CommentReplyDto> findByMdmIdAndParentId(Long mdmId, String ip, Pageable pageable) {
		return queryFactory
			.select(Projections.constructor(CommentReplyDto.class,
				comment.id,
				comment.content,
				comment.nickname,
				comment.likeCount,
				JPAExpressions.select(commentLike.count().gt(0))
					.from(commentLike)
					.leftJoin(commentLike.ip, ip1)
					.where(
						ip1.ip.eq(ip),
						commentLike.comment.id.eq(comment.id)
					).exists().as("liked"),
				comment.createdAt))
			.from(comment)
			.where(comment.parent.id.eq(mdmId))
			.orderBy(comment.createdAt.desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
	}

	@Override
	public List<CommentReplyDto> findByTop3Comments(String ip, Long mdmId) {
		return queryFactory
			.select(Projections.constructor(CommentReplyDto.class,
				comment.id,
				comment.content,
				comment.nickname,
				comment.likeCount,
				JPAExpressions.select(commentLike.count().gt(0))
					.from(commentLike)
					.leftJoin(commentLike.ip, ip1)
					.where(
						ip1.ip.eq(ip),
						commentLike.comment.id.eq(comment.id)
					).exists().as("liked"),
				comment.createdAt))
			.from(comment)
			.where(comment.parent.isNull(), comment.likeCount.goe(3))
			.orderBy(comment.createdAt.desc())
			.limit(3)
			.fetch();
	}
}
