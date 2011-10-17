package com.wp.carlos4web.cpropriedades.controllers;

import java.util.Collection;

import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Path;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.Validator;
import br.com.caelum.vraptor.util.jpa.extra.Load;

import com.wp.carlos4web.cpropriedades.beans.Gleba;
import com.wp.carlos4web.cpropriedades.beans.Propriedade;
import com.wp.carlos4web.cpropriedades.dao.GlebaDAO;
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
	
	@Get({
		"/cadastrar/",
		"/editar/{propriedade.id}"
	})
	public void formulario (@LoadObject Propriedade propriedade)
	{
		this.result.include("propriedade", propriedade);
	}
}
