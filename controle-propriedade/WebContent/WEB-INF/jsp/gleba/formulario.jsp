<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cih" tagdir="/WEB-INF/tags/template"	%>

<fmt:setLocale value="pt_BR"/>
<cih:template part="header" path="default"/>
		
		<h1>Cadastro/Alteração de Glebas</h1>
		
		<br/>
		<a href="<c:url value='/cadastros/glebas/${propriedade.id}/cadastrar/'/>">
			Cadastrar nova gleba
		</a>
		<br/>
		
		<c:if test="${not empty errors}">
			<div class="errors" onclick="$(this).fadeOut('slow');">
				<c:forEach var="error" items="${errors}">
				    ${error.category} - ${error.message}<br />
				</c:forEach>
			</div>
		</c:if>
		
		<form id="form" method="post" action="<c:url value='/cadastros/glebas/salvar/'/>">
			
			<input type="hidden" name="propriedade.id" id="idp" value="${propriedade.id}"/>
			<input type="hidden" name="gleba.id" id="idg" value="${gleba.id}"/>
				
			<table>
				<tr>
					<td>
						<label>
							Descrição: *<br/>
							<input type="text" class="inputbox" size="50" name="gleba.descricao" 
								id="descricao" value="${gleba.descricao}"/>
						</label>
					</td>
				
				</tr>
			</table>
			
			<input class="map-button btn" type="button" id="bt-abre-mapa"
												value="<fmt:message key='abrir.janela.mapa'/>"/>
			<input type="submit" value="Salvar"/>
			
		</form>
		
		<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=true_or_false&amp;key=ABQIAAAAaXpf-8iMc3MLup8v6WaqthTTZBWuT9oAQHW-RaNNUfDE-z2pjhT6si-Pzle1YKQ4sTzojCPRIeUfJw" type="text/javascript"></script>
		<script type="text/javascript" src="<c:url value='/js/openlayers.2.10/OpenLayers.js'/>"></script>
		
		<script type="text/javascript" src="<c:url value='/js/cih-map/cih.map.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/js/cih-map/cih.location.search.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/js/cih-map/cih.geometry.js'/>"></script>
		
		<script type="text/javascript">
			var cih = null;
			$(document).ready(function(){
				cih = new CIHMap();
				
				$('#bt-abre-mapa').unbind('click').bind('click', function(){
					cih.multiGeometryProfile({
						defaultZoomLevel: 4,
						geometryAfterLoadMap: function(){
							
				            var layer = new OpenLayers.Layer.WMS(
				            	"Hidrografia do Brasil",
				                "http://teste.hidroinformatica.org/geoserver2/gwc/service/wms", {
				                	layers		: 'sigbiogas:hidrografia',
				                	format		: 'image/png',
				                	transparent	: 'true',
				                	srs			: 'EPSG:900913'
				                }, {
				                	opacity: 0.6
				                }
				            );
				            
				            cih.getMap().addLayer(layer);
						}
					});
				});
			});
		</script>

<cih:template part="footer" path="default"/>