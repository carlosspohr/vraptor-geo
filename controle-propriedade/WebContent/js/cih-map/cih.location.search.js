function CIHLocationSearch()
{
	/**
	 * Retorna um objeto json com o resultado da busca.
	 * 
	 * @param CIHMap cihmap - referência da classe CIHMap.
	 * 
	 * @param String query - Referência para a consulta.
	 * 
	 * @returns {}
	 */
	this.executeSearch = function(cihmap, query)
	{
		var url = "http://maps.google.com/maps/geo?q=" + encodeURIComponent(query) +"&key=" + cihmap.getOptions().googleApiKey + "&sensor=false&output=json&callback=?";
		
		$.getJSON(url, function(data, textStatus){
			var result = new Array();
			
			if(data != null && data.Placemark != null)
			{
				for ( var i = 0; i < data.Placemark.length; i++) {
					var ref = data.Placemark[i];
					
					var local = {
						address	: ref.address,
						id		: ref.id,
						pontoX	: ref.Point.coordinates[0],
						pontoY	: ref.Point.coordinates[1]
					};
					
					result[i] = local;
				}
			}
			
			if(result.length == 0)
			{
				$('#result-consulta-localizacao').html(
					'<br/><div class="response-msg error ui-corner-all">' +
					'	<span>' + cihmap.getOptions().searchLocationNenhumResultadoEncontradoTitulo + '</span>' + 
						cihmap.getOptions().searchLocationNenhumResultadoEncontrado + ' [' + query + '].</div>'
				);
			}
			else
			{
				var html = "";
				if(result.length > 1)
				{
					for ( var n = 0; n < result.length; n++)
					{
						var location = result[n];
						
						html += "<label class='label-map'>" +
								"	<input type='radio' name='radio_result__' id='radio_result__" + n + "' value='" + n + "'/>&nbsp;" + location.address + "." +
								"</label>";
					}
					
					html = "<div id='div-result-content'><p>" + html + "</p></div>";
					
					$('#result-consulta-localizacao').html(html);
					
					// Trigger click.
					$('input[id^="radio_result__"]').bind('click', function(){
						var value = parseInt($(this).attr('value'));
						var location = result[value];
						
						cihmap.getMap().setCenter(cihmap.reprojetaPonto(location.pontoX, location.pontoY), cihmap.getOptions().defaultSearchZoomLevel);
						$('#result-consulta-localizacao').html('');
						$('#referencia_consulta').attr('value', '');
					});
				}
				else
				{
					var location = result[0];
					
					cihmap.getMap().setCenter(cihmap.reprojetaPonto(location.pontoX, location.pontoY), cihmap.getOptions().defaultSearchZoomLevel);
					$('#result-consulta-localizacao').html('');
				}
			}
		});
		
		return false;
	};
}