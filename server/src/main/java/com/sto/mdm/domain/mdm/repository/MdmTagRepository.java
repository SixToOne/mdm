package com.sto.mdm.domain.mdm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.mdm.entity.MdmTag;

public interface MdmTagRepository extends JpaRepository<MdmTag, Long> {
}
