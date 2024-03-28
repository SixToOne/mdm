package com.sto.mdm.domain.mdm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sto.mdm.domain.mdm.entity.Mdm;

public interface MdmRepository extends JpaRepository<Mdm, Long> {
	@Query(value = "select mdm_id from mdm where created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) order by vote desc limit 10",nativeQuery = true)
	List<Integer> findHotMdm();
}
