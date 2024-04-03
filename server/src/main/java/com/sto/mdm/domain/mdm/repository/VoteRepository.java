package com.sto.mdm.domain.mdm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sto.mdm.domain.mdm.entity.Vote;

public interface VoteRepository extends JpaRepository<Vote, Long> {

	@Query("SELECT v FROM Vote v WHERE v.mdm.id = :mdmId AND v.ip.ip = :ip")
	Optional<Vote> findByMdmIdAndIp(Long mdmId, String ip);
}
