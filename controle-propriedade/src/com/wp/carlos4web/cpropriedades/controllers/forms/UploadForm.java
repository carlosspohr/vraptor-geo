package com.wp.carlos4web.cpropriedades.controllers.forms;

import java.io.Serializable;

import br.com.caelum.vraptor.interceptor.multipart.UploadedFile;

/**
 * Classe que encapsula o campos do formulário de upload de shapefiles.
 * 
 * @author carlos
 */
public class UploadForm implements Serializable
{
	private static final long serialVersionUID = 8542973350652267604L;

	private UploadedFile shx;
	
	private UploadedFile shp;
	
	private UploadedFile dbf;

	public UploadedFile getShx() {
		return shx;
	}

	public void setShx(UploadedFile shx) {
		this.shx = shx;
	}

	public UploadedFile getShp() {
		return shp;
	}

	public void setShp(UploadedFile shp) {
		this.shp = shp;
	}

	public UploadedFile getDbf() {
		return dbf;
	}

	public void setDbf(UploadedFile dbf) {
		this.dbf = dbf;
	}

	@Override
	public String toString() {
		return "UploadForm [shx=" + shx + ", shp=" + shp + ", dbf=" + dbf + "]";
	}
}
