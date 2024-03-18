package com.sto.mdm.domain.mdm.entity;

import com.sto.mdm.domain.BaseEntity;
import com.sto.mdm.domain.ip.entity.Ip;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VoteIp extends BaseEntity {

	@Id
	@GeneratedValue
	@Column(name = "vote_ip_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "vote_id")
	private Vote vote;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ip_id")
	private Ip ip;

}
