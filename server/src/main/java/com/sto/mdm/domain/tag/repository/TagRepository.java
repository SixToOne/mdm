package com.sto.mdm.domain.tag.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sto.mdm.domain.tag.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
	Optional<Tag> findByName(String name);

	List<Tag> findAllByName(String keyword);

	@Query("SELECT t.name FROM Tag t WHERE t.name LIKE :keyword%")
	List<String> searchTag(@Param("keyword") String keyword);
}
