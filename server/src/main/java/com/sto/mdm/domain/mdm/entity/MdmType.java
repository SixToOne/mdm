package com.sto.mdm.domain.mdm.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum MdmType {
	HUMOR("humor"), FINANCE("finance");

	private final String type;

	@JsonCreator
	public static MdmType from(String value) {
		for (MdmType status : MdmType.values()) {
			if (status.getType().equals(value)) {
				return status;
			}
		}
		return null;
	}

	@JsonValue
	public String getType() {
		return type;
	}
}
