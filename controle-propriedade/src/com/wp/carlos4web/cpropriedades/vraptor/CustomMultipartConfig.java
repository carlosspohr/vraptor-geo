package com.wp.carlos4web.cpropriedades.vraptor;

import br.com.caelum.vraptor.interceptor.multipart.DefaultMultipartConfig;
import br.com.caelum.vraptor.ioc.ApplicationScoped;
import br.com.caelum.vraptor.ioc.Component;

/**
 * Classe que sobrescreve o a configuração do tamanho do upload máximo na 
 * aplicação.
 * 
 * @author Carlos A. Junior (CIH - Centro Internacional de Hidroinformática - carlosjrcabello@gmail.com)
 */
@Component
@ApplicationScoped
public class CustomMultipartConfig extends DefaultMultipartConfig
{
	/**
	 * Retorna o tamanho máximo de um arquivo no upload. Aqui dizemos que
	 * será 50 megas.
	 */
	public long getSizeLimit()
	{
        return 50 * 1024 * 1024; // 50MB
    }
}
