<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cih" tagdir="/WEB-INF/tags/template"	%>

<fmt:setLocale value="pt_BR"/>
<cih:template part="header" path="default"/>
		
	<h1>Consulta de propriedades por polígono</h1>
	
	<form id="form" method="post" action="<c:url value='/consultas/propriedades/processa/'/>">
		
		<table>
			<tr>
				<td>
					<label>
						Nome da Propriedade: *<br/>
						<input type="text" class="inputbox" size="30" name="consulta.propriedade.nomePropriedade" 
							id="nome_propriedade" value="${consulta.propriedade.nomePropriedade}"/>
					</label>
				</td>
			</tr>
			<tr>
				<td>
					<label>
						Nome do Proprietário: *<br/>
						<input type="text" class="inputbox" size="30" name="consulta.propriedade.nomeProprietario" 
							id="nomeProprietario" value="${consulta.propriedade.nomeProprietario}"/>
					</label>
				</td>
			</tr>
			<tr>
				<td>
					<label>
						Ordenar por: *<br/>
						<select id="ordem" name="consulta.ordem">
							<option value="DATA_CADASTRO">Data de Cadastro</option>
							<option value="NOME_PROPRIEDADE">Nome da Propriedade</option>
							<option value="NOME_PROPRIETARIO">Nome do Proprietário</option>
						</select>
					</label>
				</td>
			</tr>
			<tr>
				<td>
					<label>
						Modo: *<br/>
						<select id="tipo" name="consulta.tipo">
							<option value="ASC">Ascendente</option>
							<option value="DESC">Decrescente</option>
						</select>
					</label>
				</td>
			</tr>
			<tr>
				<td>
					<label>
						WKT: *<br/>
						<textarea rows="10" cols="40" style="width: 80%;" id="wkt" name="consulta.wkt">${consulta.wkt}</textarea>
					</label>
				</td>
			</tr>
		</table>
		
		<br/>
		<input class="map-button btn" type="button" id="bt-abre-mapa" value="<fmt:message key='abrir.janela.mapa'/>"/>
		<br/>
		<br/>
		<input type="submit" value="Consultar"/>
	</form>
	
	<c:if test="${not empty propriedades}">
		<h3>Resultados</h3>
		
		<table class="tabela-dados">
			<thead>
				<tr>
					<th width="10%" style="text-align: center;">#</th>
					<th>Nome da Propriedade</th>
					<th>Proprietário</th>
					<th width="15%">Opções</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${propriedades}" var="p" varStatus="cont">
					<tr>
						<td style="text-align: center;">${p.id}</td>
						<td>${p.nomePropriedade}</td>
						<td>${p.nomeProprietario}</td>
						<td>
							<a href="<c:url value='/cadastros/glebas/${p.id}'/>">Glebas</a>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</c:if>
	
	<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=true_or_false&amp;key=ABQIAAAAaXpf-8iMc3MLup8v6WaqthTTZBWuT9oAQHW-RaNNUfDE-z2pjhT6si-Pzle1YKQ4sTzojCPRIeUfJw" type="text/javascript"></script>
	<script type="text/javascript" src="<c:url value='/js/jquery-ui/jquery-ui-1.8.10.custom.min.js'/>"></script>
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
					defaultZoomLevel: 4
				});
			});
		});
	</script>
<cih:template part="footer" path="default"/>