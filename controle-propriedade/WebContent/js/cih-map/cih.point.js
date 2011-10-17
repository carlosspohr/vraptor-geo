function CIHPointProfile()
{
	/**
	 * @type CIHMap
	 */
	this.cihmap = null;
	
	this.markersLayer = null;
	/**
	 * Construtor padrão desta classe.
	 * 
	 * @param CIHMap cihmapInstance
	 */
	this.configure = function(cihmapInstance)
	{
		if(cihmapInstance == null)
		{
			throw "A instância do CIHMap está nula.";
		}
		
		this.cihmap = cihmapInstance;
	};
	
	this.start = function()
	{
		this.addPointActions();
		
		//Leitura.
		var pontoX = $(this.getCihMap().getOptions().singlePointInputReadWriteX).attr('value');
		var pontoY = $(this.getCihMap().getOptions().singlePointInputReadWriteY).attr('value');
		
		if(pontoX != '' && pontoY != '')
		{
			this.addMarker(pontoX, pontoY, true);
		}
	};
	
	this.addPointActions = function()
	{
		this.markersLayer = new OpenLayers.Layer.Markers("Markers");
		
		this.getCihMap().getMap().addLayer(this.markersLayer);
		
		var instancia = this;
		this.getCihMap().getMap().events.register("click", instancia, function(evt)
		{
        	instancia.setCoordenadasInput(evt, instancia.getCihMap(), instancia.getMarkersLayer()); 
        });
	};
	
	/**
	 * Desenha a barra de buttons que faz a interação com os controles do OpenLayers.
	 */
	this.addPointToolbar = function ()
	{
		var html = "";
		
		html += "<input type='button' class='submit' id='btOlControlNavigation' value='Navegar no Mapa'/>&nbsp;";
		html += "<input type='button' class='submit' id='btOlControlDeletePoint' value='Excluir Ponto'/>&nbsp;";
		html += "<input type='button' class='submit' id='btOlControlAddPoint' value='Adicionar Ponto'/>&nbsp;";
		
		$("#table_linha1_1_1__").append(html);
		
		// Registrando os listeners.
		var instancia = this;
		$('#btOlControlNavigation').bind('click', function(){
			return instancia.enableControlById("navigation");
		});
		
		$('#btOlControlDeletePoint').bind('click', function(){
			return instancia.enableControlById("delete");
		});
		
		$('#btOlControlAddPoint').bind('click', function(){
			return instancia.enableControlById("add-point");
		});
	};
	
	/**
	 * Retorna um objeto OpenLayers.Point devidamente convertido para a projeção do mapa.
	 * 
	 * @returns {OpenLayers.Point}
	 */
	this.getPointAtXY = function(evt)
	{
		var ponto 		= this.getCihMap().getMap().getLonLatFromPixel(evt.xy);
	    var convertido 	= ponto.transform( this.getCihMap().getMap().getProjectionObject(), new OpenLayers.Projection("EPSG:4326"));
	    
	    return convertido;
	};
	
	/**
	 * Passa para um determinado input XY os valores das coordenadas do ponto criado.
	 * 
	 * @returns void
	 */
	this.setCoordenadasInput = function (evt, map, markers)
	{
		var ponto = this.getPointAtXY(evt);
	    
	    var lat = this.converteCoordenadaParaGMS(ponto.lat);
	    var lon = this.converteCoordenadaParaGMS(ponto.lon);
	    
	    $('#ponto_x, ' + this.getCihMap().getOptions().singlePointInputReadWriteX).attr('value', ponto.lon);
	    $('#ponto_y, ' + this.getCihMap().getOptions().singlePointInputReadWriteY).attr('value', ponto.lat);
	   	
	    // TODO rever isto.
	    this.removeMarkers();
		this.addMarker(ponto.lon, ponto.lat, true);
	};
	
	this.removeMarkers = function ()
	{
		this.getMarkersLayer().clearMarkers();
	};
	
	/**
	 * Adiciona um novo marcador na camada de marcadores <code>this.getMarkersLayers()</code>
	 * 
	 * @param longitude - eixo X do ponto clicado.
	 * 
	 * @param latitude - eixo Y do ponto clicado.
	 * 
	 * @param centralizar - flag boolean para centralizar ou não o mapa após o click.
	 * 
	 * @returns void
	 */
	this.addMarker = function (longitude, latitude, centralizar)
	{
		var imageIconPath = "/sigbiogas/js/cih-map/img/marker.png";
		
		var size 	= new OpenLayers.Size(20, 34);
        var offset 	= new OpenLayers.Pixel(-(size.w / 2), -size.h);
        var icon 	= new OpenLayers.Icon(imageIconPath, size, offset);
		
		var lonLat = new OpenLayers.LonLat(longitude, latitude);
		var convertido 	= lonLat.transform(new OpenLayers.Projection("EPSG:4326"), this.getCihMap().getMap().getProjectionObject());
        
        this.getMarkersLayer().addMarker(new OpenLayers.Marker(lonLat, icon));
		
		if(centralizar == true)
		{
			//this.getCihMap().getMap().setCenter(new OpenLayers.LonLat(lonLat.lon, lonLat.lat), this.getCihMap().getOptions().defaultGeometryAddZoomLevel);
		}
	};
	
	/**
	 * Converte um objeto de GMS para uma coordenada.
	 */
	this.converteGMSParaCoordenada = function (gms, grau, minuto, segundo)
	{
		var result = null;
		
		if(gms != null)
		{
			result = Math.abs(gms.grau) + (gms.minuto / 60) + (gms.segundo / 3600);
		}
		else
		{
			result = Math.abs(grau) + (minuto / 60) + (segundo / 3600);
		}
		return result;
	};
	
	/**
	 * Converte uma coordenada X ou Y para um objeto de coordenada em grau minuto segundo.
	 * 
	 * @param coordenada
	 * 
	 * @returns object {grau, minuto, segundo}
	 */
	this.converteCoordenadaParaGMS = function (coordenada)
	{
		var result = null;
		
		var grau 		= parseInt(coordenada);
	    var minuto 		= (Math.abs(coordenada) - Math.abs(grau)) * 60;
		var segundo 	= (Math.abs(minuto) - Math.abs(parseInt(minuto))) * 60;
		
		result = {
			grau	: parseInt(coordenada),
			minuto	: parseInt(minuto),
			segundo	: segundo
		};
		
		return result;
	};
	
	/**
	 * @returns {CHIMap}
	 */
	this.getCihMap = function()
	{
		return this.cihmap;
	};
	
	/**
	 * @returns {OpenLayers.Markers}
	 */
	this.getMarkersLayer = function()
	{
		return this.markersLayer;
	};
}