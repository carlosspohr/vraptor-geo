<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cih" tagdir="/WEB-INF/tags/template"	%>

<fmt:setLocale value="pt_BR"/>
<cih:template part="header" path="default"/>
		
		<h1>Cadastro/Alteração de Propriedades</h1>
		
		<br/>
		<a href="<c:url value='/cadastros/propriedades/cadastrar/'/>">
			Cadastrar nova propriedade
		</a>
		<br/>
		
		<c:if test="${not empty errors}">
			<div class="errors" onclick="$(this).fadeOut('slow');">
				<c:forEach var="error" items="${errors}">
				    ${error.category} - ${error.message}<br />
				</c:forEach>
			</div>
		</c:if>
		
		<form id="form" method="post" action="<c:url value='/cadastros/propriedades/salvar/'/>">
			
			<input type="hidden" name="propriedade.id" id="id" value="${propriedade.id}"/>
				
			<table>
				<tr>
					<td>
						<label>
							Nome da Propriedade: *<br/>
							<input type="text" class="inputbox" size="30" name="propriedade.nomePropriedade" 
								id="nomePropriedade" value="${propriedade.nomePropriedade}"/>
						</label>
					</td>
					<td>
						<label>
							Nome do Proprietário: *<br/>
							<input type="text" class="inputbox" size="30" name="propriedade.nomeProprietario" 
								id="nomeProprietario" value="${propriedade.nomeProprietario}"/>
						</label>
					</td>
				</tr>
				<tr>
					<td>
						<label>
							Longitude: *<br/>
							<input type="text" class="inputbox" size="30" name="propriedade.x" 
								id="x" value="${propriedade.point.x}"/>
						</label>
					</td>
					<td>
						<label>
							Latitude: *<br/>
							<input type="text" class="inputbox" size="30" name="propriedade.y" 
								id="y" value="${propriedade.point.y}"/>
						</label>
					</td>
				</tr>
			</table>
			
			<br/>
			
			<div id="mapa" style="width: 80%; height: 250px;"></div>
			<div id="box_coordenadas__"></div>
			
			<br/>
			<input type="submit" value="Salvar"/>
			
		</form>
		
		<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=true_or_false&amp;key=ABQIAAAAaXpf-8iMc3MLup8v6WaqthTTZBWuT9oAQHW-RaNNUfDE-z2pjhT6si-Pzle1YKQ4sTzojCPRIeUfJw" type="text/javascript"></script>
		<script type="text/javascript" src="<c:url value='/js/openlayers.2.10/OpenLayers.js'/>"></script>
		
		<script type="text/javascript">
			$(document).ready(function(){
				
				var options = {
					//controls:[],
					maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
					projection		 : new OpenLayers.Projection("EPSG:900913"),
					displayProjection: new OpenLayers.Projection("EPSG:4326"),
					Z_INDEX_BASE: {
						BaseLayer	: 0,
						Overlay		: 32,
						Feature		: 72,
						Popup		: 75,
						Control		: 90
					}
				};
				var map = new OpenLayers.Map("mapa", options);
				
				var gmap = new OpenLayers.Layer.Google(
					"Google Streets",
		            {
						numZoomLevels		: 20,
						'sphericalMercator'	: true
					}
		        );
		        var ghyb = new OpenLayers.Layer.Google(
		        	"Google Híbrido",
		            {
						type				: G_HYBRID_MAP, 
						numZoomLevels		: 20,
						'sphericalMercator'	: true
					}
		        );
		        var gsat = new OpenLayers.Layer.Google(
		        	"Google Satélite",
		            {
						type				: G_SATELLITE_MAP, 
						numZoomLevels		: 22,
						'sphericalMercator'	: true
					}
		        );
				var gphy = new OpenLayers.Layer.Google(
					"Google Físico",
		            {
						type				: G_PHYSICAL_MAP,
						numZoomLevels		: 22,
						'sphericalMercator'	: true
					}
		        );
		        
				var mapnik = new OpenLayers.Layer.OSM();
				
				map.addLayers([ghyb, gmap, gphy, gsat, mapnik]);
				
				
				// Controles.
				var layerSwitcher = new OpenLayers.Control.LayerSwitcher({
					id: 'layer-switcher',
					ascending:false,
					roundedCorner: true
				});
				
				var mousePosition = new OpenLayers.Control.MousePosition({
					id: 'mouse-position',
					div:document.getElementById("box_coordenadas__")
				});
				
				var scaleLine = new OpenLayers.Control.ScaleLine({
					id: 'scale-line',
					div:document.getElementById("box_escala__")
				});
				
				var navigation = new OpenLayers.Control.Navigation({
					id: 'navigation',
					zoomWheelEnabled: true
				});
				
				map.addControl (layerSwitcher);
				map.addControl (mousePosition);
				map.addControl (scaleLine);
				map.addControl (navigation);

				
				
				// onclick.
				var markersLayer = new OpenLayers.Layer.Markers("Markers");
				
				map.addLayer(markersLayer);
				
				var instancia = map;
				map.events.register("click", instancia, function(evt)
				{
		        	setCoordenadasInput(evt, map, markersLayer); 
		        });
				
				
				map.setCenter(new OpenLayers.LonLat(-57.25572, -26.51011).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()), 5);
				
				function setCoordenadasInput(evt, map, markerLayer)
				{
					var ponto = getPointAtXY(evt);
				    
				    $('#x').attr('value', ponto.lon);
				    $('#y').attr('value', ponto.lat);
				   	
				    markerLayer.clearMarkers();
					
					var imageIconPath = "/controle-propriedade/templates/default/css/img/marker.png";
					
					var size 	= new OpenLayers.Size(20, 34);
			        var offset 	= new OpenLayers.Pixel(-(size.w / 2), -size.h);
			        var icon 	= new OpenLayers.Icon(imageIconPath, size, offset);
					
					var lonLat = new OpenLayers.LonLat(ponto.lon, ponto.lat);
			        
			        markerLayer.addMarker(new OpenLayers.Marker(
			        	lonLat.transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()), icon));
				}
				
				function getPointAtXY(evt)
				{
					var ponto 		= map.getLonLatFromPixel(evt.xy);
				    var convertido 	= ponto.transform(map.getProjectionObject(), new OpenLayers.Projection("EPSG:4326"));
				    
				    return convertido;
				};
				
			});
		</script>

<cih:template part="footer" path="default"/>