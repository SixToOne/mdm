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
import com.sto.mdm.domain.mdm.entity.QComment;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepositoryCustom {

	private final JPAQueryFactory queryFactory;

	@Override
	public List<CommentReplyDto> findByMdmIdAndParentIsNull(Long mdmId, String ip, Pageable pageable) {
		QComment comment1 = new QComment("comment1");
		return queryFactory
			.select(Projections.constructor(CommentReplyDto.class,
				JPAExpressions.select(comment1.count())
					.from(comment1)
					.where(
						comment1.parent.id.eq(comment.id)
					),
				comment.id,
				comment.content,
				comment.nickname,
				comment.likeCount,
				JPAExpressions.select(commentLike.count())
					.from(commentLike)
					.leftJoin(commentLike.ip, ip1)
					.where(
						ip1.ip.eq(ip),
						commentLike.comment.id.eq(comment.id)
					).gt(0L),
				comment.createdAt))
			.from(comment)
			.leftJoin(comment.parent, comment1)
			.where(comment.mdm.id.eq(mdmId), comment.parent.isNull())
			.orderBy(comment.createdAt.desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
	}

	@Override
	public List<CommentReplyDto> findByMdmIdAndParentId(Long mdmId, String ip, Pageable pageable) {
		QComment comment1 = new QComment("comment1");
		return queryFactory
			.select(Projections.constructor(CommentReplyDto.class,
				JPAExpressions.select(comment1.count())
					.from(comment1)
					.where(
						comment1.parent.id.eq(comment.id)
					),
				comment.id,
				comment.content,
				comment.nickname,
				comment.likeCount,
				JPAExpressions.select(commentLike.count())
					.from(commentLike)
					.leftJoin(commentLike.ip, ip1)
					.where(
						ip1.ip.eq(ip),
						commentLike.comment.id.eq(comment.id)
					).gt(0L),
				comment.createdAt))
			.from(comment)
			.leftJoin(comment.parent, comment1)
			.where(comment.parent.id.eq(mdmId))
			.orderBy(comment.createdAt.desc())
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();
	}

	@Override
	public List<CommentReplyDto> findByTop3Comments(String ip, Long mdmId) {
		QComment comment1 = new QComment("comment1");
		return queryFactory
			.select(Projections.constructor(CommentReplyDto.class,
				JPAExpressions.select(comment1.count())
					.from(comment1)
					.where(
						comment1.parent.id.eq(comment.id)
					),
				comment.id,
				comment.content,
				comment.nickname,
				comment.likeCount,
				JPAExpressions.select(commentLike.count())
					.from(commentLike)
					.leftJoin(commentLike.ip, ip1)
					.where(
						ip1.ip.eq(ip),
						commentLike.comment.id.eq(comment.id)
					).gt(0L),
				comment.createdAt))
			.from(comment)
			.leftJoin(comment.parent, comment1)
			.where(comment.parent.isNull(), comment.likeCount.goe(3), comment.mdm.id.eq(mdmId))
			.orderBy(comment.createdAt.desc())
			.limit(3)
			.fetch();
	}
}
