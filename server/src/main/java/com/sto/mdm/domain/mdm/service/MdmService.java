package com.sto.mdm.domain.mdm.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sto.mdm.domain.mdm.dto.MdmRequestDto;
import com.sto.mdm.domain.mdm.entity.Mdm;
import com.sto.mdm.domain.mdm.entity.MdmTag;
import com.sto.mdm.domain.mdm.repository.MdmRepository;
import com.sto.mdm.domain.mdm.repository.MdmTagRepository;
import com.sto.mdm.domain.tag.entity.Tag;
import com.sto.mdm.domain.tag.repository.TagRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MdmService {

	private final MdmRepository mdmRepository;
	private final TagRepository tagRepository;
	private final MdmTagRepository mdmTagRepository;

	@Transactional
	public void createMdm(MdmRequestDto mdmRequestDto) {

		Mdm mdm = mdmRequestDto.toEntity();

		mdmRepository.save(mdm);

		mdmRequestDto.tags().forEach(t -> {
			Tag tag = tagRepository.findByName(t)
				.orElseGet(() -> tagRepository.save(Tag.builder().name(t).build()));
			mdmTagRepository.save(MdmTag.builder().mdm(mdm).tag(tag).build());
		});

	}
}

