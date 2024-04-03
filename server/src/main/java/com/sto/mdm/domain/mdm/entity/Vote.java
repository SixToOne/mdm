package com.sto.mdm.domain.mdm.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.sto.mdm.domain.BaseEntity;
import com.sto.mdm.domain.ip.entity.Ip;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@SQLDelete(sql = "UPDATE vote SET deleted = true WHERE vote_id = ?")
@SQLRestriction("deleted = false")
public class Vote extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "vote_id")
	private Long id;

	private int count1;

	private int count2;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "mdm_id")
	private Mdm mdm;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ip_id")
	private Ip ip;

	public void revote(int count1, int count2) {
		this.count1 = count1;
		this.count2 = count2;
	}

}
