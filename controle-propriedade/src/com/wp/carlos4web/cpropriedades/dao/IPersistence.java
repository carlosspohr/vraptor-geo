package com.wp.carlos4web.cpropriedades.dao;

import java.io.Serializable;
import java.util.Collection;

public interface IPersistence
{
	public Object persist (Object object);
	
	public Object 	merge (Object object);
	
	public Object 	update (Object object);
	
	public void 	delete (Object object);
	
	@SuppressWarnings("rawtypes")
	public Object findById (Class clazz, Serializable id);
	
	@SuppressWarnings("rawtypes")
	public Collection<Object> findAll(Class clazz);
}
