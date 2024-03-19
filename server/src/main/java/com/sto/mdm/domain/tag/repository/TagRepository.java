package com.sto.mdm.domain.tag.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sto.mdm.domain.tag.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
	Optional<Tag> findByName(String name);
}
