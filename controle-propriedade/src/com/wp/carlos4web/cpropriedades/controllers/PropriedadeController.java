package com.wp.carlos4web.cpropriedades.controllers;

import java.util.Collection;
import java.util.Locale;
import java.util.ResourceBundle;

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
		
		// TODO Rever esta validação depois. ResourceBundle.getBundle("/i18n/messages")
		System.out.println("-------------------" + Locale.ENGLISH);
		
		ResourceBundle.getBundle("");
		
		Locale l = new Locale("");
		
		//l.getAvailableLocales()
		
		validator.checking(new Validations(ResourceBundle.getBundle("messages", Locale.ENGLISH)){{
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
