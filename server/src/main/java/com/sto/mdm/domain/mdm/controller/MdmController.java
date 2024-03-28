package com.sto.mdm.domain.mdm.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sto.mdm.domain.mdm.dto.CommentDto;
import com.sto.mdm.domain.mdm.dto.CommentResponseDto;
import com.sto.mdm.domain.mdm.dto.DeleteDto;
import com.sto.mdm.domain.mdm.dto.HotMdmResponseDto;
import com.sto.mdm.domain.mdm.dto.MdmCreateResponseDto;
import com.sto.mdm.domain.mdm.dto.MdmRequestDto;
import com.sto.mdm.domain.mdm.dto.MdmResponseDto;
import com.sto.mdm.domain.mdm.dto.MdmSearchDto;
import com.sto.mdm.domain.mdm.dto.MdmUpdateRequestDto;
import com.sto.mdm.domain.mdm.dto.VoteDto;
import com.sto.mdm.domain.mdm.service.MdmService;
import com.sto.mdm.global.response.BaseResponse;
import com.sto.mdm.global.util.IpUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/mdms")
@RequiredArgsConstructor
public class MdmController {

	private final MdmService mdmService;

	@PostMapping
	ResponseEntity<BaseResponse<MdmCreateResponseDto>> postMdm(
		@RequestPart MdmRequestDto mdmRequestDto,
		@RequestPart(required = false) MultipartFile image1,
		@RequestPart(required = false) MultipartFile image2,
		@RequestPart(required = false) List<MultipartFile> images
	) {
		return ResponseEntity.ok(new BaseResponse<>(200, "success",
			new MdmCreateResponseDto(mdmService.createMdm(mdmRequestDto, image1, image2, images))));
	}

	@PatchMapping("/{mdmId}")
	ResponseEntity<BaseResponse<String>> patchMdm(@PathVariable Long mdmId,
		@RequestBody MdmUpdateRequestDto mdmUpdateRequestDto) {
		mdmService.updateMdm(mdmId, mdmUpdateRequestDto);
		return ResponseEntity.ok(new BaseResponse<>(200, "success", null));
	}

	@DeleteMapping("/{mdmId}")
	ResponseEntity<BaseResponse<String>> deleteMdm(@PathVariable Long mdmId, @RequestBody DeleteDto deleteDto) {
		mdmService.deleteMdm(deleteDto.password(), mdmId);
		return ResponseEntity.ok(new BaseResponse<>(200, "success", null));
	}

	@GetMapping("/{mdmId}")
	ResponseEntity<BaseResponse<MdmResponseDto>> getMdm(HttpServletRequest request, @PathVariable Long mdmId) {
		String ip = IpUtil.getClientIP(request);
		return ResponseEntity.ok(new BaseResponse<>(200, "success", mdmService.getMdm(mdmId, ip)));
	}

	@GetMapping("/{mdmId}/comments")
	ResponseEntity<BaseResponse<CommentResponseDto>> getComments(HttpServletRequest request, @PathVariable Long mdmId,
		Pageable pageable) {
		String ip = IpUtil.getClientIP(request);
		return ResponseEntity.ok(new BaseResponse<>(200, "success", mdmService.getComments(ip, mdmId, pageable)));
	}

	@GetMapping("/{mdmId}/comments/top3")
	ResponseEntity<BaseResponse<CommentResponseDto>> getTop3Comments(HttpServletRequest request,
		@PathVariable Long mdmId) {
		String ip = IpUtil.getClientIP(request);
		return ResponseEntity.ok(new BaseResponse<>(200, "success", mdmService.getTop3Comments(ip, mdmId)));
	}

	@PostMapping("/{mdmId}/comments")
	ResponseEntity<BaseResponse<String>> postComment(@PathVariable Long mdmId,
		@RequestBody CommentDto commentDto) {
		mdmService.createComment(mdmId, commentDto);
		return ResponseEntity.ok(new BaseResponse<>(200, "success", null));
	}

	@DeleteMapping("/{mdmId}/comments/{commentId}")
	ResponseEntity<BaseResponse<String>> deleteComment(@PathVariable Long commentId,
		@RequestBody DeleteDto deleteDto) {
		mdmService.deleteComment(deleteDto.password(), commentId);
		return ResponseEntity.ok(new BaseResponse<>(200, "success", null));
	}

	@PostMapping("/{mdmId}/comments/{commentId}/reply")
	ResponseEntity<BaseResponse<String>> postReply(@PathVariable Long mdmId, @PathVariable Long commentId,
		@RequestBody CommentDto commentDto) {
		mdmService.replyComment(mdmId, commentId, commentDto);
		return ResponseEntity.ok(new BaseResponse<>(200, "success", null));
	}

	@GetMapping("/{mdmId}/comments/{commentId}/reply")
	ResponseEntity<BaseResponse<CommentResponseDto>> getReply(HttpServletRequest request, @PathVariable Long mdmId,
		@PathVariable Long commentId,
		Pageable pageable) {
		String ip = IpUtil.getClientIP(request);
		return ResponseEntity.ok(new BaseResponse<>(200, "success",
			mdmService.getReplies(ip, mdmId, commentId, pageable)));
	}

	//몇대몇 검색
	@GetMapping("/search")
	ResponseEntity<BaseResponse<List<MdmSearchDto>>> searchMdm(@RequestParam String keyword) {
		return ResponseEntity.ok(new BaseResponse<>(200, "success", mdmService.searchMdm(keyword)));
	}

	@GetMapping("/hot")
	ResponseEntity<BaseResponse<HotMdmResponseDto>> getFunMdm() {
		return ResponseEntity.ok(new BaseResponse<>(200, "success", mdmService.getHotMdm()));

	}

	@PostMapping("/{mdmId}/comments/{commentId}/likes")
	ResponseEntity<BaseResponse<String>> likeComment(HttpServletRequest request, @PathVariable Long mdmId,
		@PathVariable Long commentId) {
		mdmService.likeComment(mdmId, commentId, IpUtil.getClientIP(request));
		return ResponseEntity.ok(new BaseResponse<>(200, "success", null));
	}

	@PostMapping("/{mdmId}/vote")
	ResponseEntity<BaseResponse<String>> voteMdm(HttpServletRequest request, @PathVariable Long mdmId,
		@RequestBody VoteDto voteDto) {
		mdmService.voteMdm(IpUtil.getClientIP(request), mdmId, voteDto);
		return ResponseEntity.ok(new BaseResponse<>(200, "success", null));
	}

}
