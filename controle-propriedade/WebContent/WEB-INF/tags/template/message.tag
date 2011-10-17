	<%@tag pageEncoding="UTF-8" 
	description="Carrega o array de mensagens armazenadas pela aplicação" 
	display-name="mensagem"
	isELIgnored="false"
	body-content="scriptless"
	%>
	
	<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
	<%@ taglib prefix="c" 	uri="http://java.sun.com/jsp/jstl/core" %>
	<%@ taglib prefix="fn"	uri="http://java.sun.com/jsp/jstl/functions"  %>
	
	<%@attribute name="box_cssClass" required="false" description="Classe CSS para o box das mensagens."%>
	<%@attribute name="effect" required="false" description="Classe CSS para o box das mensagens."%>
	<%@attribute name="box_id" rtexprvalue="true" required="false" description="ID da box das mensagens."%>
	
	<div id="${empty box_id ? 'div_box_mensagens' : box_id}">
		<div class="jquery-message-box">
			<c:if test="${systemMessages != null}">
					<c:forEach items="${systemMessages}" var="sys_">
					
						<div class="${fn:toLowerCase(sys_.cssClassTipo)}">
							<c:if test="${sys_.tituloMensagem != null}">
								<span><fmt:message key="${sys_.tituloMensagem}"/></span>
							</c:if>
							<fmt:message key="${sys_.conteudoMensagem}"/>
						</div>
						
					</c:forEach>
				
				<script type="text/javascript">
					$(document).ready(function(){
						try
						{
							var id = '${box_id}';
							
							id = id != '' ? id : 'div_box_mensagens';
							
							$("#" + id).bind('click', function(){
								$("#" + id).slideUp('slow');
							});
						} catch (e) {
							alert(e + id);
						}
						
					});
				</script>
			</c:if>
		</div>
	</div>
<jsp:doBody/>