package com.sto.mdm.global.infra.dictionary.model;

import java.util.List;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@XmlRootElement(name = "item")
@XmlAccessorType(XmlAccessType.FIELD)
@Getter
@Setter
public class Item {

	@XmlElement(name = "target_code")
	private int targetCode;
	@XmlElement(name = "word")
	private String word;
	@XmlElement(name = "sup_no")
	private int supNo;
	@XmlElement(name = "origin")
	private String origin;
	@XmlElement(name = "pronunciation")
	private String pronunciation;
	@XmlElement(name = "word_grade")
	private String wordGrade;
	@XmlElement(name = "pos")
	private String pos;
	@XmlElement(name = "link")
	private String link;
	@XmlElement(name = "sense")
	private List<Sense> sense;

}
