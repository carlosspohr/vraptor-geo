package com.wp.carlos4web.cpropriedades.beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

import com.vividsolutions.jts.geom.Point;

@Entity(name="propriedade")
public class Propriedade implements Serializable
{
	private static final long serialVersionUID = -8566443875938969359L;
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@Column(nullable=false)
	private String nomePropriedade;
	
	@Column(nullable=false)
	private String nomeProprietario;
	
	@Column(nullable=false)
	@Type(type="org.hibernatespatial.GeometryUserType")
	private Point point;
	
	@OneToMany(mappedBy="propriedade", fetch=FetchType.LAZY)
	private Collection<Gleba> glebas = new ArrayList<Gleba>();
	
	@Transient
	private Double x, y;
	
	public Propriedade()
	{
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNomePropriedade() {
		return nomePropriedade;
	}

	public void setNomePropriedade(String nomePropriedade) {
		this.nomePropriedade = nomePropriedade;
	}

	public String getNomeProprietario() {
		return nomeProprietario;
	}

	public void setNomeProprietario(String nomeProprietario) {
		this.nomeProprietario = nomeProprietario;
	}

	public Point getPoint() {
		return point;
	}

	public void setPoint(Point point) {
		this.point = point;
	}

	public Collection<Gleba> getGlebas() {
		return glebas;
	}

	public void setGlebas(Collection<Gleba> glebas) {
		this.glebas = glebas;
	}

	public Double getX() {
		return x;
	}

	public void setX(Double x) {
		this.x = x;
	}

	public Double getY() {
		return y;
	}

	public void setY(Double y) {
		this.y = y;
	}
}
