package com.sto.mdm.domain.mdm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.mdm.entity.MdmTag;

public interface MdmTagRepository extends JpaRepository<MdmTag, Long> {

	List<MdmTag> findByMdmId(Long mdmId);

	List<MdmTag> findByTagId(Long tagId);
}
