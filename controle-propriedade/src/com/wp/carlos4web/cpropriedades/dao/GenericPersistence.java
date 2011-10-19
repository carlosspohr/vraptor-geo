package com.wp.carlos4web.cpropriedades.dao;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.EntityManager;

import org.hibernate.Criteria;
import org.hibernate.classic.Session;

import br.com.caelum.vraptor.ioc.Component;

/**
 * Implementação padrão dos métodos de persistência. O uso da annotation @Componente é necessário
 * para que o VRaptor possa resolver as suas dependências ao ser injetado em outros lugares.
 * 
 * @author Carlos A. Junior (CIH - Centro Internacional de Hidroinformática - carlosjrcabello@gmail.com)
 */
@Component
public abstract class GenericPersistence implements IPersistence
{
	private EntityManager entityManager;
	
	/**
	 * Construtor padrão que recebe uma instancia do EntityManager que foi gerenciado totalmente
	 * pelo VRaptor.
	 * 
	 * @see web.xml - declaração do pacote util.jpa
	 * 
	 * @param entityManager
	 */
	public GenericPersistence(EntityManager entityManager)
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
