<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


	<h1>Menu Principal</h1>
	<div class="box-menu">
		<ul>
			<li>
				<a href="<c:url value='/'/>">
					Home
				</a>
			</li>
			<li>
				<a href="<c:url value='/cadastros/propriedades/'/>">
					Propriedades
				</a>
			</li>
			<li>
				<a href="<c:url value='/cadastros/glebas/'/>">
					Glebas
				</a>
			</li>
			<li>
				<a href="<c:url value='/consultas/propriedades/'/>">
					Consulta
				</a>
			</li>
			<li>
				<a href="<c:url value='/cadastros/upload-shapefile/'/>">
					Upload shapefile
				</a>
			</li>
		</ul>
	</div>
