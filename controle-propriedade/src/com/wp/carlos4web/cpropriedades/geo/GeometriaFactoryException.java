package com.wp.carlos4web.cpropriedades.geo;

/**
 * Exception padrão para a classe de conversão de geometrias.
 * 
 * @author Carlos A. Junior (CIH - Centro Internacional de Hidroinformática)
 */
public class GeometriaFactoryException extends Exception
{
	private static final long serialVersionUID = -5227139677437897189L;

	public GeometriaFactoryException() {
		super();
	}

	public GeometriaFactoryException(String message, Throwable cause) {
		super(message, cause);
	}

	public GeometriaFactoryException(String message) {
		super(message);
	}

	public GeometriaFactoryException(Throwable cause) {
		super(cause);
	}
	
	
}
