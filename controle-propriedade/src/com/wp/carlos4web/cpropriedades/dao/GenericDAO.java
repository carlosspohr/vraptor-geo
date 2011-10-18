package com.wp.carlos4web.cpropriedades.dao;

import javax.persistence.EntityManager;

import br.com.caelum.vraptor.ioc.Component;

@Component
public class GenericDAO extends GenericPersistence
{
	public GenericDAO(EntityManager entityManager)
	{
		super(entityManager);
	}
}
