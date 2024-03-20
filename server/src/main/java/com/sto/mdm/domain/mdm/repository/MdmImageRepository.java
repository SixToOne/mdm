package com.sto.mdm.domain.mdm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.mdm.entity.MdmImage;

public interface MdmImageRepository extends JpaRepository<MdmImage, Long> {
}
