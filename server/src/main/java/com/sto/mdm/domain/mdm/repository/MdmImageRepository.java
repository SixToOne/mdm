package com.sto.mdm.domain.mdm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.mdm.entity.MdmImage;

public interface MdmImageRepository extends JpaRepository<MdmImage, Long> {

	List<MdmImage> findByMdmId(Long mdmId);
}
