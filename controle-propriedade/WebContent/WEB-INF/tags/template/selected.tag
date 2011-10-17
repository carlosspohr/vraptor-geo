<%@tag pageEncoding="UTF-8" 
	description="Aplica ao elemento SELECT -- OPTION o elemento SELECTED caso seja o mesmo da comparação." 
	display-name="selected"
	isELIgnored="false"
	body-content="scriptless"
	%>
	<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	
	<%@attribute name="staticValue" required="true" description="Valor estático para a comparação."%>
	<%@attribute name="toCompare" required="true" description="Valor dinâmico a ser comparado (de uma Collection qualquer)."%>
	
	<c:if test="${staticValue == toCompare}">selected="selected"</c:if>
<jsp:doBody/>