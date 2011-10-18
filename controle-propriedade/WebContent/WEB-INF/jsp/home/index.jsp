<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cih" tagdir="/WEB-INF/tags/template"	%>

<fmt:setLocale value="${usuario_session != null ? usuario_session.idioma : 'pt_BR'}"/>
<cih:template part="header" path="default"/>
	<h1>Página Inicial</h1>
	<p>
		 
	</p>
<cih:template part="footer" path="default"/>