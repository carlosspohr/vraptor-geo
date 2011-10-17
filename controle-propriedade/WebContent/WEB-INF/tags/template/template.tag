	<%@tag pageEncoding="UTF-8" 
	description="Carrega o template selecionado pela aplicação" 
	display-name="template"
	isELIgnored="false"
	body-content="scriptless"
	%>
	
	<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
	<%@ taglib prefix="c" 	uri="http://java.sun.com/jsp/jstl/core" %>
	<%@ taglib prefix="fn"	uri="http://java.sun.com/jsp/jstl/functions"  %>
	
	<%@attribute name="path" required="true" description="Caminho do template."%>
	<%@attribute name="part" required="true" description="Parte do template a ser incluída. header ou footer."%>
	
	<c:if test="${path != null && part != null}">
		<c:catch var="templateException">
			<c:if test="${part == 'header'}">
				<jsp:include page='../../../templates/${path}/header.jsp' />
			</c:if>
			
			<c:if test="${part == 'footer'}">
				<jsp:include page='../../../templates/${path}/footer.jsp' />
			</c:if>
		</c:catch>
		<c:if test="${!empty templateException}">
		    <div style="display: block; border: 1px solid #990000; background: #FFDAB9; color:#556B2F; padding: 10px; font-size:12px;">
		    	Um erro ocorreu ao tentar incluir o template do sistema.
		    	<br/>
		    	<b>Mensagem do erro: </b>
		    	<br/>
		    	${templateException.message}
		    </div>
		</c:if>
	</c:if>
<jsp:doBody/>