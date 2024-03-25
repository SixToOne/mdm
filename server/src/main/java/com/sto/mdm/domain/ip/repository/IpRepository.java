package com.sto.mdm.domain.ip.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.ip.entity.Ip;

public interface IpRepository extends JpaRepository<Ip, Long> {
	Optional<Ip> findByIp(String ip);
}
