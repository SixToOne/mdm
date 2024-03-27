package com.sto.mdm.domain.mdm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.mdm.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>, CommentRepositoryCustom {
	// @Query(
	// 	"select new com.sto.mdm.domain.mdm.dto.CommentReplyDto(c.id, c.content, c.nickname, c.password, c.likeCount ,c.createdAt)"
	// 		+ " from Comment c"
	// 		+ " where c.mdm.id = :mdmId and c.parent is null"
	// 		+ " order by c.createdAt desc")
	// Page<CommentReplyDto> findByMdmIdAndParentIsNull(Long mdmId, String ip, Pageable pageable);
	//
	// @Query(
	// 	"select new com.sto.mdm.domain.mdm.dto.CommentReplyDto(c.id, c.content, c.nickname, c.password, c.likeCount, c.createdAt)"
	// 		+ " from Comment c"
	// 		+ " where c.parent.id = :parentId"
	// 		+ " order by c.createdAt desc")
	// Page<CommentReplyDto> findByMdmIdAndParentId(Long parentId, Pageable pageable);
	//
	// @Query(
	// 	"select new com.sto.mdm.domain.mdm.dto.CommentReplyDto(c.id, c.content, c.nickname, c.password, c.likeCount, c.createdAt)"
	// 		+ " from Comment c"
	// 		+ " where c.mdm.id = :mdmId and c.parent is null and c.likeCount >= 2"
	// 		+ " order by c.likeCount desc limit 3")
	// List<CommentReplyDto> findByTop3Comments(Long mdmId);

	long countByMdmId(Long mdmId);

}
