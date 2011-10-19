<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cih" tagdir="/WEB-INF/tags/template"	%>

<fmt:setLocale value="pt_BR"/>
<cih:template part="header" path="default"/>
		
	<h1>Upload de shapefiles</h1>
	
	<form id="form" method="post" enctype="multipart/form-data" 
		action="<c:url value='/cadastros/upload-shapefile/salvar/'/>">
		
		<table>
			<tr>
				<td>
					<label>
						.shp: * <br/>
						<input type="file" class="inputbox" size="30" name="upload.shp" 
							id="shp" value="${upload.shp}"/>
					</label>
				</td>
			</tr>
			<tr>
				<td>
					<label>
						.shx: * <br/>
						<input type="file" class="inputbox" size="30" name="upload.shx" 
							id="shx" value="${upload.shx}"/>
					</label>
				</td>
			</tr>
			<tr>
				<td>
					<label>
						.dbf: * <br/>
						<input type="file" class="inputbox" size="30" name="upload.dbf" 
							id="dbf" value="${upload.dbf}"/>
					</label>
				</td>
			</tr>
		</table>
		<br/>
		<input type="submit" value="Salvar"/>
	</form>
	
	<h2>Estados cadastrados</h2>
	
	<c:if test="${empty estados}">
		<p>
			<i>Nenhum Estado foi cadastrado ainda.</i>
		</p>
	</c:if>
	
	<table class="tabela-dados">
		<thead>
			<tr>
				<th width="10%" style="text-align: center;">#</th>
				<th>Sigla</th>
				<th>Nome do Estado</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach items="${estados}" var="p" varStatus="cont">
				<tr>
					<td style="text-align: center;">${p.id}</td>
					<td>${p.sigla}</td>
					<td>${p.nome}</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
<cih:template part="footer" path="default"/>