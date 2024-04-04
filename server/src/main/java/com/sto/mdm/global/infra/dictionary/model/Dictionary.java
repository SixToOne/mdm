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
@Getter
@Setter
@XmlRootElement(name = "channel")
@XmlAccessorType(XmlAccessType.FIELD)
public class Dictionary {

	@XmlElement(name = "title")
	private String title;
	@XmlElement(name = "link")
	private String link;
	@XmlElement(name = "description")
	private String description;
	@XmlElement(name = "lastBuildDate")
	private String lastBuildDate;
	@XmlElement(name = "total")
	private int total;
	@XmlElement(name = "start")
	private int start;
	@XmlElement(name = "num")
	private int num;
	@XmlElement(name = "item")
	private List<Item> item;

}
