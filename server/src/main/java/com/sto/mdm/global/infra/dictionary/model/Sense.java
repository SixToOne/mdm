package com.sto.mdm.global.infra.dictionary.model;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@XmlRootElement(name = "sense")
@XmlAccessorType(XmlAccessType.FIELD)
@Setter
@Getter
public class Sense {

	@XmlElement(name = "sense_order")
	private int senseOrder;
	@XmlElement(name = "definition")
	private String definition;

}
