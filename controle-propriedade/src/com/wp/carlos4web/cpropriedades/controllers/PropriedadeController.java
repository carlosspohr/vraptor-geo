package com.wp.carlos4web.cpropriedades.controllers;

import java.util.Collection;

import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Path;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;
import br.com.caelum.vraptor.Validator;
import br.com.caelum.vraptor.validator.Validations;

import com.vividsolutions.jts.geom.Point;
import com.wp.carlos4web.cpropriedades.beans.Propriedade;
import com.wp.carlos4web.cpropriedades.dao.GenericDAO;
import com.wp.carlos4web.cpropriedades.geo.GeometriaFactory;
import com.wp.carlos4web.cpropriedades.vraptor.lo.annotations.LoadObject;

@Resource
@Path("/cadastros/propriedades")
public class PropriedadeController
{
	private Result result;
	
	private GenericDAO persistence;

	private Validator validator;

	public PropriedadeController(Result result, GenericDAO persistence, Validator validator) 
	{
		this.result = result;
		this.persistence = persistence;
		this.validator = validator;
	}
	
	@Get("/")
	public void index ()
	{
		Collection<Object> propriedades = this.persistence.findAll(Propriedade.class);
		this.result.include("propriedades", propriedades);
	}
	
	@Get({
		"/excluir/{propriedade.id}"
	})
	public void excluir (@LoadObject(required=true, redirectToWhenObjectNotFound="/cadastros/propriedades/") Propriedade propriedade)
	{
		try
		{
			this.persistence.delete(propriedade);
		} catch (Exception e) {
			e.printStackTrace();
		}
		this.result.redirectTo(this.getClass()).index();
	}
	
	@Get({
		"/cadastrar/",
		"/editar/{propriedade.id}"
	})
	public void formulario (Propriedade propriedade)
	{
		if(propriedade != null && propriedade.getId() != null)
		{
			propriedade = (Propriedade) this.persistence.findById(Propriedade.class, propriedade.getId());
		}
		
		this.result.include("propriedade", propriedade);
	}
	
	@Post("/salvar/")
	public void salvar (Propriedade propriedade)
	{
		final Propriedade p = propriedade;
		//ResourceBundle.getBundle("messages", Locale.ENGLISH)
		validator.checking(new Validations(){{
			if(p != null)
			{
				that(!p.getNomePropriedade().isEmpty(), i18n("erro.validacao"), "nome.propriedade.requerido");
				that(!p.getNomeProprietario().isEmpty(), i18n("erro.validacao"), "nome.proprietario.requerido");
				
				that( !(p.getX() == null || p.getY() == null), i18n("erro.validacao"), "localizacao.propriedade.requerido");
			}
		}});
		
		validator.onErrorRedirectTo(this.getClass()).formulario(propriedade);
		
		try
		{
			Point ponto = (Point) GeometriaFactory.createPointFromCoordinates(propriedade.getX(), propriedade.getY(), 4326);
			propriedade.setPoint(ponto);
			this.persistence.update(propriedade);
			this.result.include("msg", "Propriedade salva com sucesso.");
		} catch (Exception e) {
			e.printStackTrace();
			
			this.result.include("msg", "Erro ao salvar");
		}
		this.result.redirectTo(this.getClass()).index();
	}
}
