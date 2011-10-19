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

/**
 * Controller de todas as funcionalidades da aplicação para as propriedades.
 * 
 * @author Carlos A. Junior (CIH - Centro Internacional de Hidroinformática - carlosjrcabello@gmail.com)
 */
@Resource
@Path("/cadastros/propriedades")
public class PropriedadeController
{
	private Result result;
	
	private GenericDAO persistence;

	private Validator validator;

	/**
	 * Construtor padrão do controller com as duas devidas dependências.
	 * 
	 * @param result
	 * 
	 * @param persistence
	 * 
	 * @param validator
	 */
	public PropriedadeController(Result result, GenericDAO persistence, Validator validator) 
	{
		this.result 		= result;
		this.persistence 	= persistence;
		this.validator 		= validator;
	}
	
	/**
	 * Método para listar as propriedades cadastradas. Funciona somente com o método GET e
	 * a sua URI atual é concatenada com o caminho absoluto na annotation @Path que está 
	 * na declaração desta classe.
	 * 
	 * @see Path
	 */
	@Get("/")
	public void index ()
	{
		Collection<Object> propriedades = this.persistence.findAll(Propriedade.class);
		this.result.include("propriedades", propriedades);
	}
	
	/**
	 * Método para exclusão de um objeto propriedade, onde o parâmetro é mapeado na URL GET e
	 * com carregamento feito via a annotation @LoadObject.
	 * 
	 * @param propriedade
	 */
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
	
	/**
	 * Método para salvar ou atualizar um registro de propriedade. Este método antende somente
	 * requisições POST. Este método não possui uma view jsp porque assim como o método excluir,
	 * após o seu processamento a página é redirecionada para o listagem das propriedades 
	 * cadastradas.
	 * 
	 * @param propriedade - objeto populado baseado nos parâmetros do formulário onde todos os
	 * campos deste objeto tem o name começando com "propriedade.".
	 */
	@Post("/salvar/")
	public void salvar (Propriedade propriedade)
	{
		final Propriedade p = propriedade;

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
