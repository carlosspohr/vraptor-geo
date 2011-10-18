package com.wp.carlos4web.cpropriedades.controllers;

import java.util.Collection;

import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Path;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.Validator;
import br.com.caelum.vraptor.util.jpa.extra.Load;

import com.vividsolutions.jts.geom.GeometryCollection;
import com.vividsolutions.jts.geom.Polygon;
import com.wp.carlos4web.cpropriedades.beans.Gleba;
import com.wp.carlos4web.cpropriedades.beans.Propriedade;
import com.wp.carlos4web.cpropriedades.dao.GlebaDAO;
import com.wp.carlos4web.cpropriedades.geo.GeometriaFactory;
import com.wp.carlos4web.cpropriedades.vraptor.lo.annotations.LoadObject;

@Resource
@Path("/cadastros/glebas")
public class GlebaController
{
	private Result result;
	
	private Validator validator;

	private GlebaDAO dao;

	public GlebaController(Result result, Validator validator, GlebaDAO dao) 
	{
		this.result = result;
		this.validator = validator;
		this.dao = dao;
	}
	
	@Get("/{propriedade.id}")
	public void index (@Load Propriedade propriedade)
	{
		this.result.include("propriedade", propriedade);
		
		Collection<Gleba> glebas = this.dao.findGlebasByPropriedade(propriedade);
		
		this.result.include("glebas", glebas);
	}
	
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
	
	@Get({
		"/{propriedade.id}/cadastrar/",
		"/{propriedade.id}/editar/{gleba.id}"
	})
	public void formulario (@LoadObject Propriedade propriedade, @LoadObject Gleba gleba)
	{
		this.result.include("propriedade", propriedade);
		this.result.include("gleba", gleba);
	}
	
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
