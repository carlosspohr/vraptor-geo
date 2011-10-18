package com.wp.carlos4web.cpropriedades.beans;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

import com.vividsolutions.jts.geom.Polygon;

@Entity(name="gleba")
public class Gleba implements Serializable
{
	private static final long serialVersionUID = -8566443875938969359L;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@Column(nullable=false)
	private String descricao;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="id_propriedade", nullable=false)
	private Propriedade propriedade;
	
	@Column(nullable=false)
	@Type(type="org.hibernatespatial.GeometryUserType")
	private Polygon area;
	
	@Transient
	private String wkt;
	
	public Gleba()
	{
		
	}

	public String getWkt() {
		if(this.area != null)
		{
			wkt = this.area.toString();
		}
		return wkt;
	}

	public void setWkt(String wkt) {
		this.wkt = wkt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Propriedade getPropriedade() {
		return propriedade;
	}

	public void setPropriedade(Propriedade propriedade) {
		this.propriedade = propriedade;
	}

	public Polygon getArea() {
		return area;
	}

	public void setArea(Polygon area) {
		this.area = area;
	}
}
