package com.wp.carlos4web.cpropriedades.controllers.forms;

import java.io.Serializable;

import com.wp.carlos4web.cpropriedades.beans.Propriedade;

/**
 * Classe utilitária para representar os campos de um formulário de
 * consulta.
 * 
 * @author Carlos Alberto Junior Spohr Polett (carlosjrcabello@gmail.com)
 */
public class ConsultaPropriedade implements Serializable
{
	private static final long serialVersionUID = -6960107286582310029L;
	
	private Propriedade propriedade = new Propriedade();
	
	private String wkt;
	
	private OrdemPropriedadeEnum ordem;
	
	private String tipo = "ASC";

	public ConsultaPropriedade()
	{
		super();
	}

	public String getWkt() {
		return wkt;
	}

	public void setWkt(String wkt) {
		this.wkt = wkt;
	}

	public OrdemPropriedadeEnum getOrdem() {
		return ordem;
	}

	public void setOrdem(OrdemPropriedadeEnum ordem) {
		this.ordem = ordem;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public Propriedade getPropriedade() {
		return propriedade;
	}

	public void setPropriedade(Propriedade propriedade) {
		this.propriedade = propriedade;
	}
}
