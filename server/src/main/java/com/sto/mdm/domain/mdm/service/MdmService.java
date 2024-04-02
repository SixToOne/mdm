package com.sto.mdm.domain.mdm.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.sto.mdm.domain.ip.entity.Ip;
import com.sto.mdm.domain.ip.repository.IpRepository;
import com.sto.mdm.domain.mdm.dto.CommentDto;
import com.sto.mdm.domain.mdm.dto.CommentResponseDto;
import com.sto.mdm.domain.mdm.dto.HotMdmResponseDto;
import com.sto.mdm.domain.mdm.dto.MdmFeedResponseDto;
import com.sto.mdm.domain.mdm.dto.MdmRequestDto;
import com.sto.mdm.domain.mdm.dto.MdmResponseDto;
import com.sto.mdm.domain.mdm.dto.MdmSearchDto;
import com.sto.mdm.domain.mdm.dto.MdmUpdateRequestDto;
import com.sto.mdm.domain.mdm.dto.Opinion;
import com.sto.mdm.domain.mdm.dto.VoteDto;
import com.sto.mdm.domain.mdm.entity.Comment;
import com.sto.mdm.domain.mdm.entity.CommentLike;
import com.sto.mdm.domain.mdm.entity.Mdm;
import com.sto.mdm.domain.mdm.entity.MdmImage;
import com.sto.mdm.domain.mdm.entity.MdmTag;
import com.sto.mdm.domain.mdm.entity.Vote;
import com.sto.mdm.domain.mdm.repository.CommentLikeRepository;
import com.sto.mdm.domain.mdm.repository.CommentRepository;
import com.sto.mdm.domain.mdm.repository.MdmImageRepository;
import com.sto.mdm.domain.mdm.repository.MdmRepository;
import com.sto.mdm.domain.mdm.repository.MdmTagRepository;
import com.sto.mdm.domain.mdm.repository.VoteRepository;
import com.sto.mdm.domain.quiz.dto.RelatedQuizDto;
import com.sto.mdm.domain.quiz.repository.QuizRepository;
import com.sto.mdm.domain.tag.entity.Tag;
import com.sto.mdm.domain.tag.repository.TagRepository;
import com.sto.mdm.global.infra.gpt3.GptClient;
import com.sto.mdm.global.response.BaseException;
import com.sto.mdm.global.response.ErrorCode;
import com.sto.mdm.global.util.S3Uploader;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
	private final CommentLikeRepository commentLikeRepository;
	private final IpRepository ipRepository;
	private final VoteRepository voteIpRepository;
	private final QuizRepository quizRepository;

	@Transactional
	public Long createMdm(MdmRequestDto mdmRequestDto, MultipartFile image1, MultipartFile image2,
		List<MultipartFile> images) {

		Mdm mdm = mdmRequestDto.toEntity();

		String imageUrl1 = image1 != null ? s3Uploader.saveFile(image1) : null;
		String imageUrl2 = image2 != null ? s3Uploader.saveFile(image2) : null;

		mdm.setImages(imageUrl1, imageUrl2);

		Mdm save = mdmRepository.save(mdm);
		if (images != null) {
			images.forEach(image -> {
				String imageUrl = s3Uploader.saveFile(image);
				mdmImageRepository.save(MdmImage.builder()
					.mdm(mdm)
					.image(imageUrl).build());
			});
		}

		mdmRequestDto.addTags(Arrays.stream(
				gptService.generateMdmKeyword(mdm.getContent(), mdm.getOpinion1(), mdm.getOpinion2()).split(","))
			.map(String::trim)
			.map(s -> s.replaceAll(" ", "_"))
			.toList());

		mdmRequestDto.tags().forEach(t -> {
			Tag tag = tagRepository.findByName(t)
				.orElseGet(() -> tagRepository.save(Tag.builder().name(t).build()));
			mdmTagRepository.save(MdmTag.builder().mdm(mdm).tag(tag).build());
		});

		return save.getId();

	}

	@Transactional
	public void updateMdm(Long mdmId, MdmUpdateRequestDto mdmUpdateRequestDto) {
		mdmRepository.findById(mdmId)
			.ifPresentOrElse(mdm -> mdm.update(mdmUpdateRequestDto), () -> {
				throw new BaseException(ErrorCode.MDM_NOT_FOUND);
			});
	}

	@Transactional
	public void deleteMdm(String password, Long mdmId) {
		mdmRepository.findById(mdmId)
			.ifPresentOrElse(mdm -> {
				if (mdm.getPassword().equals(password)) {
					mdmRepository.delete(mdm);
				} else {
					throw new BaseException(ErrorCode.UNAUTHORIZED);
				}
			}, () -> {
				throw new BaseException(ErrorCode.MDM_NOT_FOUND);
			});
	}

	@Transactional
	public MdmResponseDto getMdm(Long mdmId, String ip) {
		Mdm mdm = mdmRepository.findById(mdmId)
			.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));
		mdm.view();

		List<String> tags = mdmTagRepository.findByMdmId(mdmId)
			.stream().map(MdmTag::getTag)
			.map(Tag::getName)
			.collect(Collectors.toList());

		List<String> images = mdmImageRepository.findByMdmId(mdmId)
			.stream()
			.map(MdmImage::getImage)
			.collect(Collectors.toList());

		Vote vote = voteIpRepository.findByMdmIdAndIp(mdmId, ip)
			.orElse(null);

		return new MdmResponseDto(
			mdm.getId(),
			mdm.getTitle(),
			mdm.getContent(),
			new Opinion(mdm.getOpinion1(), mdm.getImage1(), mdm.getCount1(), vote != null ? vote.getCount1() : null),
			new Opinion(mdm.getOpinion2(), mdm.getImage2(), mdm.getCount2(), vote != null ? vote.getCount2() : null),
			mdm.getVote(),
			mdm.getViews(),
			mdm.getType(),
			mdm.getNickname(),
			tags,
			images,
			mdm.getCommentCount(),
			mdm.getCreatedAt()
		);

	}

	public CommentResponseDto getComments(String ip, Long mdmId, Pageable pageable) {
		mdmRepository.findById(mdmId)
			.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));

		return new CommentResponseDto(commentRepository.findByMdmIdAndParentIsNull(mdmId, ip, pageable));
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
		reply.setMdm(mdm);

		commentRepository.save(reply);
	}

	public CommentResponseDto getReplies(String ip, Long mdmId, Long commentId, Pageable pageable) {
		Mdm mdm = mdmRepository.findById(mdmId)
			.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));

		Comment comment = commentRepository.findById(commentId)
			.orElseThrow(() -> new BaseException(ErrorCode.COMMENT_NOT_FOUND));

		return new CommentResponseDto(
			commentRepository.findByMdmIdAndParentId(commentId, ip, pageable));

	}

	public List<MdmSearchDto> searchMdm(String keyword) {
		//태그명 찾기
		List<Tag> tagList = tagRepository.findAllByName(keyword);
		List<Long> mdmTagIds = null;

		for (Tag tag : tagList) {
			mdmTagIds = mdmTagRepository.findByTagId(tag.getId())
				.stream().map(MdmTag::getMdm)
				.map(Mdm::getId)
				.toList();
		}

		assert mdmTagIds != null;
		ArrayList<Long> hashSetIds = new ArrayList<>(new HashSet<>(mdmTagIds));

		return mdmRepository.findAllById(hashSetIds).stream()
			.map(mdm -> {
				//mdm 관련 tag 찾기
				List<String> tags = mdmTagRepository.findByMdmId(mdm.getId()).stream()
					.map(MdmTag::getTag)
					.map(Tag::getName)
					.toList();

				List<String> images = mdmImageRepository.findByMdmId(mdm.getId()).stream()
					.map(MdmImage::getImage)
					.toList();

				return new MdmSearchDto(
					mdm.getOpinion1(),
					mdm.getOpinion2(),
					mdm.getCount1(),
					mdm.getCount2(),
					mdm.getVote(),
					mdm.getType(),
					mdm.getNickname(),
					tags,
					mdm.getCreatedAt(),
					images
				);
			})
			.toList();
	}

	public HotMdmResponseDto getHotMdm() {
		List<Integer> allMdm = mdmRepository.findHotMdm();
		List<MdmResponseDto> result = new ArrayList<>();

		for (Integer curId : allMdm) {
			Mdm cur = mdmRepository.findById(Long.valueOf(curId))
				.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));
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
				new Opinion(cur.getOpinion1(), cur.getImage1(), cur.getCount1(), null),
				new Opinion(cur.getOpinion2(), cur.getImage2(), cur.getCount2(), null),
				cur.getVote(),
				cur.getViews(),
				cur.getType(),
				cur.getNickname(),
				tags,
				images,
				cur.getCommentCount(),
				cur.getCreatedAt()
			));
		}
		return new HotMdmResponseDto(result);

	}

	@Transactional
	public void likeComment(Long mdmId, Long commentId, String ip) {
		Mdm mdm = mdmRepository.findById(mdmId)
			.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));

		Comment comment = commentRepository.findById(commentId)
			.orElseThrow(() -> new BaseException(ErrorCode.COMMENT_NOT_FOUND));
		commentLikeRepository.findByCommentIdAndIpId(commentId, ip)
			.ifPresentOrElse(commentLikeRepository::delete, () -> {
				Ip savedIp = ipRepository.findByIp(ip)
					.orElseGet(() -> ipRepository.save(Ip.builder().ip(ip).build()));
				commentLikeRepository.save(CommentLike.builder()
					.comment(comment)
					.ip(savedIp)
					.build());
			});
	}

	public CommentResponseDto getTop3Comments(String ip, Long mdmId) {
		mdmRepository.findById(mdmId)
			.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));

		return new CommentResponseDto(commentRepository.findByTop3Comments(ip, mdmId));
	}

	@Transactional
	public void voteMdm(String clientIP, Long mdmId, VoteDto voteDto) {

		Mdm mdm = mdmRepository.findById(mdmId)
			.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));
		voteIpRepository.findByMdmIdAndIp(mdmId, clientIP)
			.ifPresentOrElse(vote -> {
				vote.revote(voteDto.count1(), voteDto.count2());
			}, () -> {
				Ip ip = ipRepository.findByIp(clientIP)
					.orElseGet(() -> ipRepository.save(Ip.builder().ip(clientIP).build()));
				voteIpRepository.save(Vote.builder()
					.mdm(mdm)
					.ip(ip)
					.count1(voteDto.count1())
					.count2(voteDto.count2())
					.build());
			});

	}

	public MdmFeedResponseDto getMdmFeed(String ip, Pageable pageable) {
		List<Mdm> mdms = mdmRepository.findAll(pageable).getContent();
		List<MdmResponseDto> result = new ArrayList<>();

		for (Mdm cur : mdms) {
			result.add(getMdm(cur.getId(), ip));
		}

		return new MdmFeedResponseDto(result);
	}

	@Transactional
	public void deleteComment(String password, Long commentId) {
		commentRepository.findById(commentId)
			.ifPresentOrElse(comment -> {
				if (comment.getPassword().equals(password)) {
					commentRepository.delete(comment);
				} else {
					throw new BaseException(ErrorCode.UNAUTHORIZED);
				}
			}, () -> {
				throw new BaseException(ErrorCode.COMMENT_NOT_FOUND);
			});

	}

	public List<RelatedQuizDto> getQuizs(Long mdmId) {
		Mdm mdm = mdmRepository.findById(mdmId)
			.orElseThrow(() -> new BaseException(ErrorCode.MDM_NOT_FOUND));

		List<Long> tags = mdmTagRepository.findByMdmId(mdmId)
			.stream().map(MdmTag::getTag)
			.map(Tag::getId)
			.toList();

		List<Long> ids = quizRepository.findAllRelatedId(tags);

		return quizRepository.findAllByTagsId(ids);

	}
}

