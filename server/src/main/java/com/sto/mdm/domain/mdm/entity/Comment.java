package com.sto.mdm.domain.mdm.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Formula;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import com.sto.mdm.domain.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE comment SET deleted = true WHERE comment_id = ?")
@SQLRestriction("deleted = false")
public class Comment extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private Long id;

	private String content;

	private String nickname;

	private String password;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "mdm_id")
	private Mdm mdm;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_id")
	private Comment parent;

	@OneToMany(mappedBy = "comment")
	private List<CommentLike> likes = new ArrayList<>();

	@Formula("(SELECT COUNT(*) FROM comment_like cl WHERE cl.comment_id = comment_id and cl.deleted = false)")
	private long likeCount;
}
