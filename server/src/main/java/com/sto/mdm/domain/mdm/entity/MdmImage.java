package com.sto.mdm.domain.mdm.entity;

import com.sto.mdm.domain.BaseEntity;

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
public class MdmImage extends BaseEntity {

	@Id
	@GeneratedValue
	@Column(name = "mdm_image_id")
	private Long id;

	private String image;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "mdm_id")
	private Mdm mdm;

}
