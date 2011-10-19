package com.wp.carlos4web.cpropriedades.beans;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Type;

import com.vividsolutions.jts.geom.Geometry;

@Entity(name="estado")
public class Estado implements Serializable
{
	private static final long serialVersionUID = -1151999788401046811L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@Column(nullable=false, length=2)
	private String sigla;
	
	@Column(nullable=false, length=250)
	private String nome;
	
	@Column(nullable=false)
	@Type(type="org.hibernatespatial.GeometryUserType")
	private Geometry limite;
	
	public Estado() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Geometry getLimite() {
		return limite;
	}

	public void setLimite(Geometry limite) {
		this.limite = limite;
	}
}