package com.wp.carlos4web.cpropriedades.geo;

import org.geotools.geometry.jts.WKTReader2;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryCollection;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.MultiPolygon;
import com.vividsolutions.jts.geom.Polygon;
import com.vividsolutions.jts.geom.PrecisionModel;
import com.vividsolutions.jts.io.ParseException;

/**
 * Classe utilitária para fazer a conversão de linhas e polígonos que 
 * estão no formato WKT para uma Geometria.
 * 
 * @author Carlos A. Junior (CIH - Centro Internacional de Hidroinformática)
 */
public class GeometriaFactory 
{
	/**
	 * Este método faz a conversão de um objeto GeometryCollection para um objeto MultiPolygon.
	 * 
	 * @param collection
	 * 
	 * @return
	 * 
	 * @throws ParseException
	 * 
	 * @throws GeometriaFactoryException
	 */
	public static Geometry convertGeometryCollectionToGeometry(GeometryCollection collection, int precision) throws ParseException, GeometriaFactoryException
	{
		if(collection != null && collection.isValid())
		{
			Polygon[] pols = new Polygon[collection.getNumGeometries()];
			
			for (int i = 0; i < collection.getNumGeometries(); i++) {
				pols[i] = (Polygon) collection.getGeometryN(i);
			}
			if(precision <= 0)
			{
				precision = 4326;
			}
			Geometry geometry = new MultiPolygon(pols, new GeometryFactory(new PrecisionModel(), precision));
			
			return geometry;
		}
		else
		{
			return null;
		}
		
	}
	
	public static Geometry createGeometryFromWKT(String wkt) throws ParseException, GeometriaFactoryException
	{
		if(wkt != null && !wkt.equals(""))
		{
			return new WKTReader2().read(wkt);
		}
		else
		{
			return null;
		}
		
	}
	
	public static GeometryCollection createGeometryCollectionFromWKT(String wkt) throws ParseException, GeometriaFactoryException
	{
		if(wkt != null && !wkt.equals(""))
		{
			WKTReader2 r = new WKTReader2();
			
			GeometryCollection collection = (GeometryCollection) r.read(wkt);
			return collection;
			//return r.read(wkt);
		}
		else
		{
			return null;
		}
		
	}
	
	/**
	 * Retorna uma instância de um objeto Point baseado em uma String WKT.
	 * 
	 * @param wkt
	 * 
	 * @return
	 * 
	 * @throws ParseException
	 * 
	 * @throws GeometriaFactoryException
	 */
	public static Geometry createPointFromWKT (String wkt) throws ParseException, GeometriaFactoryException
	{
		if(wkt != null && !wkt.equals(""))
		{
			WKTReader2 r = new WKTReader2();
			
			return r.read(wkt);
		}
		else
		{
			return null;
		}
		
	}
	
	/**Geometry
	 * Retorna uma instância de um objeto Point a partir de um par XY de coordenadas.
	 * 
	 * @param double x
	 * 
	 * @param double y
	 * 
	 * @param int precision - tipo da projeção, o padrão é 4326
	 * 
	 * @return Point 
	 * 
	 * @throws ParseException
	 * 
	 * @throws GeometriaFactoryException
	 */
	public static Geometry createPointFromCoordinates (double x, double y, int precision) throws ParseException, GeometriaFactoryException
	{
		if(precision <= 0)
		{
			precision = 4326;
		}
		GeometryFactory factory 	= new GeometryFactory(new PrecisionModel(),	precision);
		
		Geometry point = factory.createPoint(new Coordinate(x, y, precision));
		
		return point;
	}
	/**
	 * Retorna um objeto Polygon criado a partir de uma String no formato WKT.
	 * 
	 * @param String wkt - WKT com as informações dos pontos do polígono.
	 * 
	 * @return Polygon polygon - instância de um objeto Polygon.
	 * 
	 * @throws ParseException - pode ser disparada caso o WKT contenha alguma anormalidade.
	 * 
	 * @throws GeometriaFactoryException - pode ser disparada caso o WKT contenha alguma anormalidade.
	 */
	public static Geometry createPolygonFromWKT (String wkt) throws ParseException, GeometriaFactoryException
	{
		if(wkt != null && !wkt.equals(""))
		{
			WKTReader2 r = new WKTReader2();
			
			return r.read(wkt);
		}
		else
		{
			return null;
		}
		
	}
	
	/**
	 * Converte um elemento WKT em uma geometria de multi-polígono. O WKT pode ser obtido pela
	 * biblioteca do OpenLayers (camada.features.geometry). A String do WKT vem separada por ponto
	 * e virgula (;), a mesma é quebrada para construir um objeto MultiPolygon.
	 * 
	 * @param String			wktString - String do formato WKT
	 * 
	 * @return MultiPolygon 	polygon - uma geometria MultiPolygon
	 * 
	 * @throws ParseException - pode ser disparada caso o WKT contenha alguma anormalidade.
	 */
	public static Geometry parseMultiPolygonFromWKT (String wktString) throws ParseException, GeometriaFactoryException
	{
		return createMultiPolygonFromWKT (wktString, 4326);
	}
	
	/**
	 * Converte um elemento WKT em uma geometria de multi-polígono. O WKT pode ser obtido pela
	 * biblioteca do OpenLayers (camada.features.geometry). A String do WKT vem separada por ponto
	 * e virgula (;), a mesma é quebrada para construir um objeto MultiPolygon.
	 * 
	 * @param String 		wktString - String do formato WKT
	 * 
	 * @param int 			precisionModel - código da precisão da geometria. O padrão é 4326.
	 * 
	 * @return MultiPolygon polygon - uma geometria MultiPolygon
	 * 
	 * @throws ParseException - se a String do WKT contenha algum tipo de sequência anormal.
	 */
	public static Geometry createMultiPolygonFromWKT (String wktString, int precisionModel) throws ParseException, GeometriaFactoryException
	{
		if(wktString != null && !wktString.equals(""))
		{
			if(wktString.startsWith("MULTIPOLYGON"))
			{
				WKTReader2 r = new WKTReader2();
				
				return r.read(wktString);
			}
			else
			{
				String[] strPoligonos = wktString.split(";");
				
				if(strPoligonos.length > 0)
				{
					Polygon[] polygons = new Polygon[strPoligonos.length];
					
					for (int j = 0; j < strPoligonos.length; j++)
					{
						String sp = strPoligonos[j];
						
						if(sp.startsWith("POLYGON"))
						{
							Polygon polygon = (Polygon) GeometriaFactory.createPolygonFromWKT(sp);
							
							if(polygon == null)
							{
								throw new GeometriaFactoryException("Polígono nulo: [" + sp + "]");
							}
							else
							{
								polygons[j] = polygon;
							}
						}
					}
					
					if(polygons.length > 0)
					{
						if(precisionModel <= 0)
						{
							precisionModel = 4326;
						}
						
						GeometryFactory factory 	= new GeometryFactory(new PrecisionModel(),	precisionModel);
						Geometry multiPolygon 		= new MultiPolygon(polygons, factory);
						
						return multiPolygon;
					}
					else
					{
						return null;
					}
				}
				else
				{
					return null;
				}
			}
		}
		else
		{
			return null;
		}
	}
}