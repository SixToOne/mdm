package com.sto.mdm.domain.mdm.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.sto.mdm.domain.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@SQLDelete(sql = "UPDATE mdm SET deleted = true WHERE mdm_id = ?")
@SQLRestriction("deleted = false")
public class Mdm extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "mdm_id")
	private Long id;

	private String title;

	private String content;

	private String opinion1;

	private String opinion2;

	private int count1;

	private int count2;

	private String image1;

	private String image2;

	private int vote;

	private String nickname;

	private String password;

	@Enumerated(EnumType.STRING)
	private MdmType type;

}
