package com.sto.mdm.domain.mdm.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.sto.mdm.domain.mdm.dto.MdmRequestDto;
import com.sto.mdm.domain.mdm.dto.MdmUpdateRequestDto;
import com.sto.mdm.domain.mdm.entity.Mdm;
import com.sto.mdm.domain.mdm.entity.MdmImage;
import com.sto.mdm.domain.mdm.entity.MdmTag;
import com.sto.mdm.domain.mdm.repository.MdmImageRepository;
import com.sto.mdm.domain.mdm.repository.MdmRepository;
import com.sto.mdm.domain.mdm.repository.MdmTagRepository;
import com.sto.mdm.domain.tag.entity.Tag;
import com.sto.mdm.domain.tag.repository.TagRepository;
import com.sto.mdm.global.response.BaseException;
import com.sto.mdm.global.response.ErrorCode;
import com.sto.mdm.global.util.S3Uploader;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MdmService {

	private final MdmRepository mdmRepository;
	private final TagRepository tagRepository;
	private final MdmTagRepository mdmTagRepository;
	private final S3Uploader s3Uploader;
	private final MdmImageRepository mdmImageRepository;

	@Transactional
	public void createMdm(MdmRequestDto mdmRequestDto, MultipartFile image1, MultipartFile image2,
		List<MultipartFile> images) {

		Mdm mdm = mdmRequestDto.toEntity();

		String imageUrl1 = s3Uploader.saveFile(image1);
		String imageUrl2 = s3Uploader.saveFile(image2);

		mdm.setImages(imageUrl1, imageUrl2);

		mdmRepository.save(mdm);

		images.forEach(image -> {
			String imageUrl = s3Uploader.saveFile(image);
			mdmImageRepository.save(MdmImage.builder()
				.mdm(mdm)
				.image(imageUrl).build());
		});

		mdmRequestDto.tags().forEach(t -> {
			Tag tag = tagRepository.findByName(t)
				.orElseGet(() -> tagRepository.save(Tag.builder().name(t).build()));
			mdmTagRepository.save(MdmTag.builder().mdm(mdm).tag(tag).build());
		});

	}

	@Transactional
	public void updateMdm(Long mdmId, MdmUpdateRequestDto mdmUpdateRequestDto) {
		mdmRepository.findById(mdmId)
			.ifPresentOrElse(mdm -> mdm.update(mdmUpdateRequestDto), () -> {
				throw new BaseException(ErrorCode.MDM_NOT_FOUND);
			});
	}

	@Transactional
	public void deleteMdm(Long mdmId) {
		Mdm mdm = mdmRepository.findById(mdmId)
			.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));
		mdmRepository.delete(mdm);
	}
}

