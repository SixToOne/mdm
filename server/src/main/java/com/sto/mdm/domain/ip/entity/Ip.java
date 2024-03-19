package com.sto.mdm.domain.ip.entity;

import com.sto.mdm.domain.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ip extends BaseEntity {

	@Id
	@GeneratedValue
	@Column(name = "ip_id")
	private Long id;

	private String ip;

}
