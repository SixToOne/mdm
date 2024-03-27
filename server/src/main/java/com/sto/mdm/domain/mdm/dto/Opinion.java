package com.sto.mdm.domain.mdm.dto;

public record Opinion(
	String opinion,
	String image,
	int count,
	Integer myRatio
) {
}
