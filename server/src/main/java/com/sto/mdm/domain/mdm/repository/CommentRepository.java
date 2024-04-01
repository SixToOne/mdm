package com.sto.mdm.domain.mdm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.mdm.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>, CommentRepositoryCustom {

	Long countByParentId(Long parentId);

}
