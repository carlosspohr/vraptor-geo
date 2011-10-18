package com.wp.carlos4web.cpropriedades.controllers;

import java.util.Collection;

import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Path;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;

import com.vividsolutions.jts.io.ParseException;
import com.wp.carlos4web.cpropriedades.beans.Propriedade;
import com.wp.carlos4web.cpropriedades.controllers.forms.ConsultaPropriedade;
import com.wp.carlos4web.cpropriedades.dao.PropriedadeDAO;
import com.wp.carlos4web.cpropriedades.geo.GeometriaFactoryException;

@Resource
@Path("/consultas/propriedades")
public class ConsultaPropriedadeController
{
	private Result result;
	
	private PropriedadeDAO persistence;


	public ConsultaPropriedadeController(Result result, PropriedadeDAO persistence) 
	{
		this.result = result;
		this.persistence = persistence;
	}
	
	@Post("/processa/")
	public void processaConsulta (ConsultaPropriedade consulta)
	{
		this.result.redirectTo(this.getClass()).index(consulta);
	}
	
	@Get("/")
	public void index (ConsultaPropriedade consulta)
	{
		if(consulta != null)
		{
			this.result.include("consulta", consulta);
			try
			{
				Collection<Propriedade> propriedades = this.persistence.findPropriedadeByPoligono(consulta);
				this.result.include("propriedades", propriedades);
			} catch (ParseException e) {
				e.printStackTrace();
			} catch (GeometriaFactoryException e) {
				e.printStackTrace();
			}
			
		}
	}
}
