package com.sto.mdm.domain.mdm.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.sto.mdm.domain.mdm.dto.CommentReplyDto;

public interface CommentRepositoryCustom {

	List<CommentReplyDto> findByMdmIdAndParentIsNull(Long mdmId, String ip, Pageable pageable);

	List<CommentReplyDto> findByMdmIdAndParentId(Long mdmId, String ip, Pageable pageable);
	
	// 	"select new com.sto.mdm.domain.mdm.dto.CommentReplyDto(c.id, c.content, c.nickname, c.password, c.likeCount, c.createdAt)"
	// 		+ " from Comment c"
	// 		+ " where c.mdm.id = :mdmId and c.parent is null and c.likeCount >= 2"
	// 		+ " order by c.likeCount desc limit 3")
	List<CommentReplyDto> findByTop3Comments(String ip, Long mdmId);
}
