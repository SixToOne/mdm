package com.sto.mdm.domain.mdm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sto.mdm.domain.mdm.entity.MdmTag;

public interface MdmTagRepository extends JpaRepository<MdmTag, Long> {

	List<MdmTag> findByMdmId(Long mdmId);

	List<MdmTag> findByTagId(Long tagId);

	@Query("SELECT COUNT(*) FROM MdmTag mt WHERE mt.tag.name = :tagName")
	Optional<Integer> findByTagCnt(String tagName);
}
