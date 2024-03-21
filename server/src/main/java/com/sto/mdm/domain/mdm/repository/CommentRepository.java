package com.sto.mdm.domain.mdm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.mdm.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment> findByMdmIdAndParentIsNull(Long mdmId);

	List<Comment> findByParentId(Long parentId);
}
