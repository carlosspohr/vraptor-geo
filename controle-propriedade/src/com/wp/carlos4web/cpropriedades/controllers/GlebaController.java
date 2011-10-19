package com.wp.carlos4web.cpropriedades.controllers;

import java.util.Collection;

import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Path;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.util.jpa.extra.Load;

import com.vividsolutions.jts.geom.GeometryCollection;
import com.vividsolutions.jts.geom.Polygon;
import com.wp.carlos4web.cpropriedades.beans.Gleba;
import com.wp.carlos4web.cpropriedades.beans.Propriedade;
import com.wp.carlos4web.cpropriedades.dao.GlebaDAO;
import com.wp.carlos4web.cpropriedades.geo.GeometriaFactory;
import com.wp.carlos4web.cpropriedades.vraptor.lo.annotations.LoadObject;

/**
 * Controller para as funcionalidades do gerenciamento das glebas de uma propriedade.
 * 
 * @author Carlos A. Junior (CIH - Centro Internacional de Hidroinformática - carlosjrcabello@gmail.com)
 */
@Resource
@Path("/cadastros/glebas")
public class GlebaController
{
	private Result result;
	
	private GlebaDAO dao;

	/**
	 * Construtor padrão com as suas devidas dependências.
	 * 
	 * @param result
	 * 
	 * @param dao
	 */
	public GlebaController(Result result, GlebaDAO dao) 
	{
		this.result = result;
		this.dao = dao;
	}
	
	/**
	 * Método que lista as glebas de uma propriedade que foi informada por meio 
	 * do seu ID na URI anotada para o método GET. O objeto Propriedade é carregado
	 * do banco automaticamente por meio da annotation @Load
	 * 
	 * @param propriedade
	 * 
	 * @see Load
	 */
	@Get("/{propriedade.id}")
	public void index (@Load Propriedade propriedade)
	{
		this.result.include("propriedade", propriedade);
		
		Collection<Gleba> glebas = this.dao.findGlebasByPropriedade(propriedade);
		
		this.result.include("glebas", glebas);
	}
	
	/**
	 * Método que processa os dados que foram enviados pelo formulário de cadastro de glebas. Neste
	 * método é utilizada a classe GeometriaFactory para fazer a conversão do WKT gerado no formulário
	 * para um objeto Geometry.
	 * 
	 * @param gleba
	 * 
	 * @see GeometriaFactory
	 */
	@Post("/salvar/")
	public void salvar (Gleba gleba)
	{
		try
		{
			Propriedade propriedade = (Propriedade) this.dao.findById(Propriedade.class, gleba.getPropriedade().getId());
			gleba.setPropriedade(propriedade);
			GeometryCollection collection = GeometriaFactory.createGeometryCollectionFromWKT(gleba.getWkt());
			
			Polygon area = (Polygon) collection.getGeometryN(0);
			gleba.setArea(area);
			
			this.dao.update(gleba);
		} catch (Exception e) {
			e.printStackTrace();
			
			this.result.include("msg", "Erro ao salvar");
		}
		this.result.redirectTo(this.getClass()).index(gleba.getPropriedade());
	}
	
	/**
	 * Método que carrega o formulário de glebas para cadastro ou alteração, ambos os
	 * parâmetros informados na URI são carregados pela annotation @LoadObject.
	 * 
	 * @param propriedade
	 * 
	 * @param gleba
	 * 
	 * @see LoadObject
	 */
	@Get({
		"/{propriedade.id}/cadastrar/",
		"/{propriedade.id}/editar/{gleba.id}"
	})
	public void formulario (@LoadObject Propriedade propriedade, @LoadObject Gleba gleba)
	{
		this.result.include("propriedade", propriedade);
		this.result.include("gleba", gleba);
	}
	
	/**
	 * Método que exclui uma gleba da propriedade e depois redireciona para a página de
	 * listagem de propriedades.
	 * 
	 * @param propriedade
	 * 
	 * @param gleba
	 */
	@Get("/{propriedade.id}/excluir/{gleba.id}")
	public void exluir (@LoadObject Propriedade propriedade, @LoadObject Gleba gleba)
	{
		try
		{
			this.dao.delete(gleba);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		this.result.redirectTo(this.getClass()).index(propriedade);
	}
}
