package com.sto.mdm.domain.tag.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.sto.mdm.domain.BaseEntity;
import com.sto.mdm.domain.mdm.entity.MdmTag;
import com.sto.mdm.domain.quiz.entity.QuizTag;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE tag SET deleted = true WHERE tag_id = ?")
@SQLRestriction("deleted = false")
public class Tag extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "tag_id")
	private Long id;

	@OneToMany(mappedBy = "tag")
	private List<QuizTag> quizTags = new ArrayList<>();

	@OneToMany(mappedBy = "tag")
	private List<MdmTag> mdmTags = new ArrayList<>();

	private String name;

}
