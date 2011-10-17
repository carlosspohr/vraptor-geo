<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" 	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"	uri="http://java.sun.com/jsp/jstl/functions"  %>
<%@ taglib prefix="cih" tagdir="/WEB-INF/tags/template"	%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
		<title>CP - Controle de Propriedades :: ${tituloPagina != null ? tituloPagina : 'Home'}</title>
		<link href="<c:url value='/templates/default/css/img/favicon.ico'/>" rel="icon" type="image/png" />
		<link href="<c:url value='/templates/default/css/style.css'/>" 		media="all" type="text/css" rel="stylesheet"/>
		<link href="<c:url value='/js/openlayers.2.10/theme/default/style.css'/>" 		media="all" type="text/css" rel="stylesheet"/>
		
		<fmt:setLocale value="pt_BR"/>
		<script type="text/javascript" src="<c:url value='/js/jquery/jquery-1.4.3.min.js'/>"></script>
	</head>
	<body>
		<div class="layout">
			<div class="header">
					Header
			</div>
			
			<div class="box-div">
				<div class="column-left">
					<%@ include file="menu.jsp" %>
				</div>
				<div class="column-content">
					<div class="content">
						
						
					