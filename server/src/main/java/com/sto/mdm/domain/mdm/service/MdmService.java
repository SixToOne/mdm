package com.sto.mdm.domain.mdm.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.sto.mdm.domain.mdm.dto.CommentDto;
import com.sto.mdm.domain.mdm.dto.CommentReplyDto;
import com.sto.mdm.domain.mdm.dto.CommentResponseDto;
import com.sto.mdm.domain.mdm.dto.HotMdmResponseDto;
import com.sto.mdm.domain.mdm.dto.MdmRequestDto;
import com.sto.mdm.domain.mdm.dto.MdmResponseDto;
import com.sto.mdm.domain.mdm.dto.MdmUpdateRequestDto;
import com.sto.mdm.domain.mdm.entity.Comment;
import com.sto.mdm.domain.mdm.entity.Mdm;
import com.sto.mdm.domain.mdm.entity.MdmImage;
import com.sto.mdm.domain.mdm.entity.MdmTag;
import com.sto.mdm.domain.mdm.repository.CommentRepository;
import com.sto.mdm.domain.mdm.repository.MdmImageRepository;
import com.sto.mdm.domain.mdm.repository.MdmRepository;
import com.sto.mdm.domain.mdm.repository.MdmTagRepository;
import com.sto.mdm.domain.tag.entity.Tag;
import com.sto.mdm.domain.tag.repository.TagRepository;
import com.sto.mdm.global.infra.gpt3.GptClient;
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
	private final CommentRepository commentRepository;
	private final GptClient gptService;

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

		mdmRequestDto.addTags(Arrays.stream(gptService.generateMdmKeyword(mdm.getContent()).split(","))
			.toList());

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

	public MdmResponseDto getMdm(Long mdmId) {
		Mdm mdm = mdmRepository.findById(mdmId)
			.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));

		List<String> tags = mdmTagRepository.findByMdmId(mdmId)
			.stream().map(MdmTag::getTag)
			.map(Tag::getName)
			.collect(Collectors.toList());

		List<String> images = mdmImageRepository.findByMdmId(mdmId)
			.stream()
			.map(MdmImage::getImage)
			.collect(Collectors.toList());

		return new MdmResponseDto(
			mdm.getId(),
			mdm.getTitle(),
			mdm.getContent(),
			mdm.getOpinion1(),
			mdm.getOpinion2(),
			mdm.getImage1(),
			mdm.getImage2(),
			mdm.getCount1(),
			mdm.getCount2(),
			mdm.getVote(),
			mdm.getType(),
			mdm.getNickname(),
			mdm.getPassword(),
			tags,
			images
		);

	}

	public CommentResponseDto getComments(Long mdmId, Pageable pageable) {
		mdmRepository.findById(mdmId)
			.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));

		commentRepository.findByMdmIdAndParentIsNull(mdmId, pageable);

		return new CommentResponseDto(commentRepository.findByMdmIdAndParentIsNull(mdmId, pageable).getContent()
			.stream().map(comment -> new CommentReplyDto(
				comment.getId(),
				comment.getContent(),
				comment.getNickname(),
				comment.getPassword(),
				0
			))
			.collect(Collectors.toList()));
	}

	@Transactional
	public void createComment(Long mdmId, CommentDto commentDto) {
		Mdm mdm = mdmRepository.findById(mdmId)
			.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));
		Comment comment = commentDto.toEntity();
		comment.setMdm(mdm);
		commentRepository.save(comment);
	}

	@Transactional
	public void replyComment(Long mdmId, Long commentId, CommentDto commentDto) {
		Mdm mdm = mdmRepository.findById(mdmId)
			.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));

		Comment comment = commentRepository.findById(commentId)
			.orElseThrow(() -> new BaseException(ErrorCode.COMMENT_NOT_FOUND));

		Comment reply = commentDto.toEntity();
		reply.setParent(comment);

		commentRepository.save(reply);
	}

	public CommentResponseDto getReplies(Long mdmId, Long commentId, Pageable pageable) {
		Mdm mdm = mdmRepository.findById(mdmId)
			.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));

		Comment comment = commentRepository.findById(commentId)
			.orElseThrow(() -> new BaseException(ErrorCode.COMMENT_NOT_FOUND));

		return new CommentResponseDto(commentRepository.findByMdmIdAndParentId(mdmId, commentId, pageable).getContent()
			.stream().map(c -> new CommentReplyDto(
				c.getId(),
				c.getContent(),
				c.getNickname(),
				c.getPassword(),
				0
			))
			.collect(Collectors.toList()));

	}

	public HotMdmResponseDto getHotMdm() {
		List<Mdm> allMdm=mdmRepository.findHotMdm();
		List<MdmResponseDto> result=new ArrayList<>();

		for(Mdm cur: allMdm){
			List<String> tags = mdmTagRepository.findByMdmId(cur.getId())
				.stream().map(MdmTag::getTag)
				.map(Tag::getName)
				.collect(Collectors.toList());

			List<String> images = mdmImageRepository.findByMdmId(cur.getId())
				.stream()
				.map(MdmImage::getImage)
				.collect(Collectors.toList());

			result.add(new MdmResponseDto(
				cur.getId(),
				cur.getTitle(),
				cur.getContent(),
				cur.getOpinion1(),
				cur.getOpinion2(),
				cur.getImage1(),
				cur.getImage2(),
				cur.getCount1(),
				cur.getCount2(),
				cur.getVote(),
				cur.getType(),
				cur.getNickname(),
				cur.getPassword(),
				tags,
				images
			));
		}

		return new HotMdmResponseDto(result);
	}
}

