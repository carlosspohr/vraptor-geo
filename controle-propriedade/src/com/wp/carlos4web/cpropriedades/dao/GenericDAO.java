package com.wp.carlos4web.cpropriedades.dao;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.EntityManager;

import org.hibernate.Criteria;
import org.hibernate.classic.Session;

import br.com.caelum.vraptor.ioc.Component;

@Component
public class GenericDAO implements IPersistence
{
	private EntityManager entityManager;
	
	public GenericDAO(EntityManager entityManager)
	{
		super();
		this.entityManager = entityManager;
	}

	@Override
	public Object persist(Object object)
	{
		if(object != null)
		{
			this.getEntityManager().persist(object);
			
			return object;
		}
		return null;
	}

	@Override
	public Object merge(Object object)
	{
		if(object != null)
		{
			this.getEntityManager().merge(object);
		}
		return null;
	}

	@Override
	public Object update(Object object)
	{
		return this.merge(object);
	}

	@Override
	public void delete(Object object)
	{
		if(object != null)
		{
			this.getEntityManager().remove(object);
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public Object findById(Class clazz, Serializable id)
	{
		if(clazz != null && id != null)
		{
			return this.getEntityManager().find(clazz, id);
		}
		return null;
	}

	public EntityManager getEntityManager() {
		return entityManager;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public Collection<Object> findAll(Class clazz)
	{
		Criteria criteria = ((Session) this.getEntityManager().getDelegate()).createCriteria(clazz);
		
		return criteria.list();
	}
}
