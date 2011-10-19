package com.wp.carlos4web.cpropriedades.dao;

import javax.persistence.EntityManager;

import br.com.caelum.vraptor.ioc.Component;

/**
 * Estensão da classe {@link GenericPersistence}, só que esta é uma classe concreta
 * e é utilizada para ser injetada nas lógicas do sistema. Também necessita da annotation
 * @Component.
 * 
 * @author Carlos A. Junior (CIH - Centro Internacional de Hidroinformática - carlosjrcabello@gmail.com)
 */
@Component
public class GenericDAO extends GenericPersistence
{
	public GenericDAO(EntityManager entityManager)
	{
		super(entityManager);
	}
}
