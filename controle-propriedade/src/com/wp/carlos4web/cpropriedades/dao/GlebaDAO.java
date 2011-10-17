package com.wp.carlos4web.cpropriedades.dao;

import java.util.Collection;

import javax.persistence.EntityManager;

import org.hibernate.Criteria;
import org.hibernate.classic.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import br.com.caelum.vraptor.ioc.Component;

import com.wp.carlos4web.cpropriedades.beans.Gleba;
import com.wp.carlos4web.cpropriedades.beans.Propriedade;

//@Component
public class GlebaDAO extends GenericDAO
{
	public GlebaDAO(EntityManager entityManager)
	{
		super(entityManager);
	}
	
	@SuppressWarnings("unchecked")
	public Collection<Gleba> findGlebasByPropriedade(Propriedade propriedade)
	{
		Criteria criteria = ((Session) this.getEntityManager().getDelegate())
								.createCriteria(Gleba.class)
								.createAlias("propriedade", "p");
		
		criteria.add(Restrictions.eq("p.id", propriedade.getId()));
		criteria.addOrder(Order.desc("descricao"));
		
		return criteria.list();
	}
}
