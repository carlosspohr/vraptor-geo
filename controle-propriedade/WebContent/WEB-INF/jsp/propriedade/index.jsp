<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cih" tagdir="/WEB-INF/tags/template"	%>

<fmt:setLocale value="pt_BR"/>
<cih:template part="header" path="default"/>
	
	<h1>Propriedades Cadastradas</h1>
	
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
					<td>${p.nomePropriedade}</td>
					<td>
						<a href="<c:url value='/cadastros/propriedades/editar/${p.id}'/>">Editar</a>
						&nbsp;
						<a href="<c:url value='/cadastros/propriedades/excluir/${p.id}'/>">Excluir</a>
					</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
<cih:template part="footer" path="default"/>