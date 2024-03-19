package com.sto.mdm.domain.mdm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.mdm.entity.Mdm;

public interface MdmRepository extends JpaRepository<Mdm, Long> {
}
