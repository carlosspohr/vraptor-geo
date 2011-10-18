package com.wp.carlos4web.cpropriedades.dao;

import java.util.Collection;

import javax.persistence.EntityManager;

import org.hibernate.Criteria;
import org.hibernate.classic.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import br.com.caelum.vraptor.ioc.Component;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.io.ParseException;
import com.wp.carlos4web.cpropriedades.beans.Propriedade;
import com.wp.carlos4web.cpropriedades.controllers.forms.ConsultaPropriedade;
import com.wp.carlos4web.cpropriedades.controllers.forms.OrdemPropriedadeEnum;
import com.wp.carlos4web.cpropriedades.dao.restrictions.GeometryRestrictions;
import com.wp.carlos4web.cpropriedades.geo.GeometriaFactory;
import com.wp.carlos4web.cpropriedades.geo.GeometriaFactoryException;

@Component
public class PropriedadeDAO extends GenericPersistence
{
	public PropriedadeDAO(EntityManager entityManager)
	{
		super(entityManager);
	}
	
	@SuppressWarnings("unchecked")
	public Collection<Propriedade> findPropriedadeByPoligono(ConsultaPropriedade consulta) throws ParseException, GeometriaFactoryException
	{
		Criteria criteria = ((Session) this.getEntityManager().getDelegate()).createCriteria(Propriedade.class);
		
		if(consulta.getPropriedade().getNomePropriedade() != null && !consulta.getPropriedade().getNomePropriedade().isEmpty())
		{
			criteria.add(Restrictions.ilike("nomePropriedade", consulta.getPropriedade().getNomePropriedade()));
		}
		
		if(consulta.getPropriedade().getNomeProprietario() != null && !consulta.getPropriedade().getNomeProprietario().isEmpty())
		{
			criteria.add(Restrictions.ilike("nomeProprietario", consulta.getPropriedade().getNomeProprietario()));
		}
		
		if(consulta.getWkt() != null && !consulta.getWkt().isEmpty())
		{
			Geometry geometria = GeometriaFactory.createPolygonFromWKT(consulta.getWkt());
			criteria.add(GeometryRestrictions.covers("point", geometria, 4326));
		}
		
		String ordem = "dataCadastro";
		
		if(consulta.getOrdem().equals(OrdemPropriedadeEnum.NOME_PROPRIEDADE))
		{
			ordem = "nomePropriedade";
		}
		else
		{
			ordem = "nomeProprietario";
		}
		
		if(consulta.getTipo().equals("DESC"))
		{
			criteria.addOrder(Order.desc(ordem));
		}
		else
		{
			criteria.addOrder(Order.asc(ordem));
		}
		return criteria.list();
	}
}
