package com.sto.mdm.domain.mdm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sto.mdm.domain.mdm.dto.MdmRequestDto;
import com.sto.mdm.domain.mdm.service.MdmService;
import com.sto.mdm.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/mdms")
@RequiredArgsConstructor
public class MdmController {

	private final MdmService mdmService;

	@PostMapping
	ResponseEntity<BaseResponse<String>> postMdm(@RequestBody MdmRequestDto mdmRequestDto) {
		mdmService.createMdm(mdmRequestDto);
		return ResponseEntity.ok(new BaseResponse<>(200, "success", null));
	}

}
