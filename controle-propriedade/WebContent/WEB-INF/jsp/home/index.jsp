<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cih" tagdir="/WEB-INF/tags/template"	%>

<fmt:setLocale value="${usuario_session != null ? usuario_session.idioma : 'pt_BR'}"/>
<cih:template part="header" path="default"/>
	<h1>Página Inicial</h1>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam aliquet commodo. Nam pretium, erat vitae pellentesque aliquet, lorem lorem tempor enim, non fringilla quam justo in libero. Pellentesque non nunc arcu. Nullam vel augue ut elit semper congue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla in tortor dolor. Proin adipiscing, mauris eu dictum posuere, nisl nibh suscipit erat, id porttitor orci lorem vitae ipsum. 
	</p>
	<h2>Página Inicial</h2>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam aliquet commodo. Nam pretium, erat vitae pellentesque aliquet, lorem lorem tempor enim, non fringilla quam justo in libero. Pellentesque non nunc arcu. Nullam vel augue ut elit semper congue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla in tortor dolor. Proin adipiscing, mauris eu dictum posuere, nisl nibh suscipit erat, id porttitor orci lorem vitae ipsum. 
	</p>
	<h3>Página Inicial</h3>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam aliquet commodo. Nam pretium, erat vitae pellentesque aliquet, lorem lorem tempor enim, non fringilla quam justo in libero. Pellentesque non nunc arcu. Nullam vel augue ut elit semper congue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla in tortor dolor. Proin adipiscing, mauris eu dictum posuere, nisl nibh suscipit erat, id porttitor orci lorem vitae ipsum. 
	</p>
<cih:template part="footer" path="default"/>