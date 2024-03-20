package com.sto.mdm.domain.mdm.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sto.mdm.domain.mdm.dto.MdmRequestDto;
import com.sto.mdm.domain.mdm.dto.MdmUpdateRequestDto;
import com.sto.mdm.domain.mdm.service.MdmService;
import com.sto.mdm.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/mdms")
@RequiredArgsConstructor
public class MdmController {

	private final MdmService mdmService;

	@PostMapping
	ResponseEntity<BaseResponse<String>> postMdm(
		@RequestPart MdmRequestDto mdmRequestDto,
		@RequestPart(required = false) MultipartFile image1,
		@RequestPart(required = false) MultipartFile image2,
		@RequestPart(required = false) List<MultipartFile> images
	) {
		mdmService.createMdm(mdmRequestDto, image1, image2, images);
		return ResponseEntity.ok(new BaseResponse<>(200, "success", null));
	}

	@PatchMapping("/{mdmId}")
	ResponseEntity<BaseResponse<String>> patchMdm(@PathVariable Long mdmId,
		@RequestBody MdmUpdateRequestDto mdmUpdateRequestDto) {
		mdmService.updateMdm(mdmId, mdmUpdateRequestDto);
		return ResponseEntity.ok(new BaseResponse<>(200, "success", null));
	}

	@DeleteMapping("/{mdmId}")
	ResponseEntity<BaseResponse<String>> deleteMdm(@PathVariable Long mdmId) {
		mdmService.deleteMdm(mdmId);
		return ResponseEntity.ok(new BaseResponse<>(200, "success", null));
	}

}
