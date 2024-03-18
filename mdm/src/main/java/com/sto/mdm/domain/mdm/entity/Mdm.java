package com.sto.mdm.domain.mdm.entity;


import com.sto.mdm.domain.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class Mdm extends BaseEntity {

	@Id
	@GeneratedValue
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
