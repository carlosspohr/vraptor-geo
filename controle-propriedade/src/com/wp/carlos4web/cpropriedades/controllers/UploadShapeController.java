package com.wp.carlos4web.cpropriedades.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.hidroinformatica.shapes.ShapeFileReader;
import org.hidroinformatica.shapes.exceptions.EmptyDefinitionMapException;

import br.com.caelum.vraptor.Get;
import br.com.caelum.vraptor.Path;
import br.com.caelum.vraptor.Post;
import br.com.caelum.vraptor.Resource;
import br.com.caelum.vraptor.Result;

import com.wp.carlos4web.cpropriedades.beans.Estado;
import com.wp.carlos4web.cpropriedades.controllers.forms.UploadForm;
import com.wp.carlos4web.cpropriedades.dao.GenericDAO;

@Resource
@Path("/cadastros/upload-shapefile")
public class UploadShapeController
{
	private Result result;
	
	private GenericDAO persistence;

	public UploadShapeController(Result result, GenericDAO persistence) 
	{
		this.result = result;
		this.persistence = persistence;
	}
	
	@Get("/")
	public void index ()
	{
		Collection<Object> estados = this.persistence.findAll(Estado.class);
		this.result.include("estados", estados);
	}
	
	
	@Post("/salvar/")
	public void salvar (UploadForm upload, ServletContext context) throws IOException
	{
		String caminho = context.getRealPath("/") + "/WEB-INF/arquivos/";
		String prefixo = Calendar.getInstance().getTimeInMillis() + "";
		
		
		// Copia o arquivo SHP
		String arquivoDestinoShp = prefixo + "." + FilenameUtils.getExtension(upload.getShp().getFileName());
		IOUtils.copyLarge(upload.getShp().getFile(), new FileOutputStream(new File(caminho, arquivoDestinoShp)));
		File shp = new File(caminho + arquivoDestinoShp);
		
		// Copia o arquivo SHX
		String arquivoDestinoShx = prefixo + "." + FilenameUtils.getExtension(upload.getShx().getFileName());
		IOUtils.copyLarge(upload.getShx().getFile(), new FileOutputStream(new File(caminho, arquivoDestinoShx)));
		
		// Copia o arquivo DBF
		String arquivoDestinoDbf = prefixo + "." + FilenameUtils.getExtension(upload.getDbf().getFileName());
		IOUtils.copyLarge(upload.getDbf().getFile(), new FileOutputStream(new File(caminho, arquivoDestinoDbf)));
		
		// Leitura do arquivo SHP.
		Map<String, String> definitions = new HashMap<String, String>();

		definitions.put("LEVEL_4_CO", 	"sigla");
		definitions.put("LEVEL_4_NA", 	"nome");
		
		definitions.put("the_geom", 	"limite");

		ShapeFileReader reader;
		try {
			reader = new ShapeFileReader(Estado.class, shp, definitions);
			reader.setSrid(4326);

			List<Serializable> estados = reader.getRecords();
			
			for (Serializable serializable : estados)
			{
				Estado estado = (Estado) serializable;
				if(estado.getLimite() == null)
				{
					continue;
				}
				
				this.persistence.persist(estado);
			}
			
		} catch (NullPointerException e) {
			e.printStackTrace();
		} catch (EmptyDefinitionMapException e) {
			e.printStackTrace();
		}
		
		this.result.redirectTo(this.getClass()).index();
	}
}
