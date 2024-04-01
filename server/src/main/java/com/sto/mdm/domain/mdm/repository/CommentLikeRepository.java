package com.sto.mdm.domain.mdm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sto.mdm.domain.mdm.entity.CommentLike;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
	@Query("select cl from CommentLike cl join fetch cl.ip ip where cl.comment.id = :commentId and cl.ip.ip = :ipId and cl.deleted = false")
	Optional<CommentLike> findByCommentIdAndIpId(Long commentId, String ipId);
}
