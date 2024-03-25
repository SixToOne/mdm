package com.sto.mdm.domain.mdm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.mdm.entity.CommentLike;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
	Optional<CommentLike> findByCommentIdAndIpId(Long commentId, Long ipId);
}
