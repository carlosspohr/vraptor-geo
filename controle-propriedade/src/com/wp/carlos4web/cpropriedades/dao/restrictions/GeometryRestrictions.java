package com.wp.carlos4web.cpropriedades.dao.restrictions;

import java.lang.reflect.Field;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

import com.vividsolutions.jts.geom.Geometry;


/**
 * Classe static-access com a implementação das restrições para a Restrictions.sqlRestriction
 * do Hibernate.
 *  
 * @author Carlos A. Junior (CIH - Centro Internacional de Hidroinformática)
 */
public class GeometryRestrictions
{
	/**
	 * Monta o critério para filtrar todos os registros de uma tabela em que o seu ponto seja coberto
	 * por um polígono WKT (Polygon ou MuiltPolygon).
	 * 
	 * @param geometryCover - WKT desenhado por um mapa. Esta é a geometria que cobre os registros desejados.
	 * 
	 * @param propertyNameCovered - Campo da tabela que é coberto pela geometria desenhada na tela.
	 * 
	 * @param precisionModel - Precisão da geometria que cobre. Padrão é 4326.
	 * 
	 * @return
	 */
	public static Criterion covers (String propertyNameCovered, Geometry geometryCover, int precisionModel)
	{
		if(precisionModel <= 1)
		{
			precisionModel = 4326;
		}
		
		if(geometryCover != null)
		{
			String result = " ST_Covers(ST_GeographyFromText('SRID=" + precisionModel + ";" + geometryCover.toString() + "'), " + propertyNameCovered + ") = true ";
			
			return Restrictions.sqlRestriction(result);
		}
		else
		{
			return null;
		}
	}
	
	public static Criterion overlaps (String propertyName, Geometry geometryOverlaped)
	{
		if(propertyName != null && geometryOverlaped != null)
		{
			String result = " ST_Overlaps(ST_GeographyFromText('" + propertyName + "'), ST_GeographyFromText ('" + geometryOverlaped + "') ) = true ";
			
			return Restrictions.sqlRestriction(result);
		}
		else
		{
			return null;
		}
	}
	
	@SuppressWarnings("rawtypes")
	public static String getGeometryClassAttribute(Class clazz)
	{
		if(clazz == null)
		{
			return null;
		}
		else
		{
			Field[] fields = clazz.getFields();
			for (Field field : fields)
			{
				if(field.getType().equals(Geometry.class))
				{
					return field.getName();
				}
			}
			return null;
		}
	}
	
	@SuppressWarnings("rawtypes")
	public static String touches (Class clazz, Geometry polygon, int precisionModel)
	{
		if(precisionModel <= 1)
		{
			precisionModel = 4326;
		}
		String propertyCovers = GeometryRestrictions.getGeometryClassAttribute(clazz);
		
		if(polygon != null)
		{
			String result = " ST_Touches(ST_AsText(" + propertyCovers + "), '" + polygon.toString() + "') = true ";
			
			return result;
		}
		else
		{
			return null;
		}
	}
	
	@SuppressWarnings("rawtypes")
	public static String covers (Class clazz, Geometry polygon, int precisionModel)
	{
		if(precisionModel <= 1)
		{
			precisionModel = 4326;
		}
		
		String propertyCovers = GeometryRestrictions.getGeometryClassAttribute(clazz);
		
		if(polygon != null)
		{
			String result = " ST_Covers(" + propertyCovers + ", ST_GeographyFromText('SRID=" + precisionModel + ";" + polygon.toString() + "')) = true ";
			
			return result;
		}
		else
		{
			return null;
		}
	}
	
	/**
	 * Cria uma restrição por intersecção entre duas geometrias.
	 * 
	 * @param String propertyCovered
	 * 
	 * @param Polygon polygon
	 * 
	 * @param int precisionModel
	 * 
	 * @return String result
	 */
	@SuppressWarnings("rawtypes")
	public static String coveredBy (Class clazz, Geometry polygon, int precisionModel)
	{
		if(precisionModel <= 1)
		{
			precisionModel = 4326;
		}
		
		String propertyCovered = GeometryRestrictions.getGeometryClassAttribute(clazz);
		
		if(polygon != null)
		{
			String result = " ST_CoveredBy(" + propertyCovered + ", ST_GeographyFromText('SRID=" + precisionModel + ";" + polygon.toString() + "')) = true ";
			
			return result;
		}
		else
		{
			return null;
		}
	}
	
	/**
	 * Cria uma restrição por intersecção entre duas geometrias.
	 * 
	 * @param String property
	 * 
	 * @param Polygon polygon
	 * 
	 * @param int precisionModel
	 * 
	 * @return String result
	 */
	@SuppressWarnings("rawtypes")
	public static String intersects (Class clazz, Geometry polygon, int precisionModel)
	{
		if(precisionModel <= 1)
		{
			precisionModel = 4326;
		}
		
		String property = GeometryRestrictions.getGeometryClassAttribute(clazz);
		
		if(polygon != null)
		{
			String result = " ST_Intersects(ST_GeographyFromText('SRID=" + precisionModel + ";" + polygon.toString() + "'), " + property + ") = true ";
			
			return result;
		}
		else
		{
			return null;
		}
	}
}
