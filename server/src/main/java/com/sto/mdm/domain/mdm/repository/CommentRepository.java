package com.sto.mdm.domain.mdm.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.mdm.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	Page<Comment> findByMdmIdAndParentIsNull(Long mdmId, Pageable pageable);

	Page<Comment> findByMdmIdAndParentId(Long mdmId, Long parentId, Pageable pageable);

	List<Comment> findByParentId(Long parentId);

	long countByMdmId(Long mdmId);
}
