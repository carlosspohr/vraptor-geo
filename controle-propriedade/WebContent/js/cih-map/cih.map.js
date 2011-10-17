// Constantes para os tipos de profile.
var profiles = {
	SINGLE_POINT: 1,
	MULTI_POINT: 2,
	SINGLE_POLYGON: 3,
	MULTI_POLYGON:4,
	SINGLE_LINE: 5,
	MULTI_LINE:6
};

/**
 * Classe que contém a implementação de um jQuery-UI dialog com a apresentação
 * de camadas de mapas com lógicas implementadas para trabalhar com pontos e 
 * geometrias.
 * 
 * @returns {CIHMap}
 */
function CIHMap()
{
	this.uiBodyDiv 	= "uiBodyDiv___";
	
	this.uiContentDiv 	= "uiContentDiv___";
	
	this.mapDivId = "mapDiv___";
	
	this.options = null;
	
	this.map = null;
	
	this.panelFerramentas = null;
	
	/**
	 * 1 - Point (default)
	 * 2 - Points
	 * 3 - Poligono.
	 * 4 - Poligonos.
	 */
	this.profile = 1;
	
	this.afterStart = function(func)
	{
		return func();
	};
	
	this.mergeJson = function(from, parte)
	{
	    for (var z in parte)
	    {
	        if (parte.hasOwnProperty(z)) {
	            from[z] = parte[z];
	        }
	    }
	    
	    return from;
	};
	
	/**
	 * Configura as opções padrões do array de propriedades das funções de
	 * manipulação de mapas do CIH.
	 * 
	 * @return void
	 */
	this.configureOptions = function(opt)
	{
		if(this.options == null)
		{
			var instancia = this.map;
			
			this.options = {
				dialogTitle			: $.msg('cih.map.dialog.title'),
				dialogWidth			: 800,
				dialogHeight		: 550,
				dialogModal			: true,
				dialogResizable		: false,
				dialogButtonClose	: $.msg('cih.map.button.close.dialog'),
				
				searchLocationLabelText							: $.msg('cih.map.search.location.label.text'),
				searchLocationButtonText						: $.msg('cih.map.search.button.search'),
				searchLocationButtonLimpar						: $.msg('cih.map.search.button.limpar'),
				searchLocationNenhumResultadoEncontradoTitulo	: $.msg('cih.map.search.resultado.nenhum.titulo'),
				searchLocationNenhumResultadoEncontrado			: $.msg('cih.map.search.resultado.nenhum.mensagem'),
				searchLocationProcessandoConsulta				: $.msg('cih.map.search.processando.consulta'),
				searchLocationInformeUmTermoAviso				: $.msg('cih.map.search.informe.um.termo.aviso'),
				searchLocationInformeUmTermoParaConsulta		: $.msg('cih.map.search.informe.um.termo.para.a.consulta'),
				
				mapInformationLatitude		: $.msg('cih.map.latitude'),
				mapInformationLongitude		: $.msg('cih.map.longitude'),
				mapInformationCoordenadas	: $.msg('cih.map.coordenada'),
				mapInformationEscala		: $.msg('cih.map.escala'),
				mapInformationProjecao		: $.msg('cih.map.projecao'),

				googleApiKey				: 'ABQIAAAAaXpf-8iMc3MLup8v6WaqthQ3SC50Hc0sl7Yq_pGrWTQnWkV8KBTHqmY0IHnj_7Z_UTwLNY0GNWbkWg',
				defaultZoomLevel			: 10,
				defaultSearchZoomLevel		: 11,
				defaultGeometryAddZoomLevel	: 11,
				
				layerCamada			: $.msg('cih.map.layer.label'),
				layerGoogleHybrid	: $.msg('cih.map.layer.google.hybrid'),
				layerGoogleSatellite: $.msg('cih.map.layer.google.satellite'),
				layerGoogleStreets	: $.msg('cih.map.layer.google.streets'),
				layerGooglePhysical	: $.msg('cih.map.layer.google.physical'),
				layerOpenStreetMap	: $.msg('cih.map.layer.openstreet.maps'),
				
				layerBingMapShaded	: 'Bing Shaded Map',
				layerBingMapHybrid	: 'Bing Hybrid Map',
				layerBingMapAerial	: 'Bing Aerial Map',
				
				totalFeatures				:1,
				lineStringHTMLInputId		: '#linestring',
				lineStringHTMLWriteToId		: '#linestring',
				lineStringHTMLReadToId		: '#linestring',
				
				singlePointInputReadWriteX	: '#pontoX',
				singlePointInputReadWriteY	: '#pontoY',
				
				geometryButtonAddGeometry		: $.msg('cih.map.geometry.button.add'),
				geometryButtonRemoveGeometry	: $.msg('cih.map.geometry.button.remove'),
				geometryButtonNavegateGeometry	: $.msg('cih.map.geometry.button.navegate'),
				geometryInputReadWrite			: '#wkt',
				geometryWKTDisplayReadOnly		: '#wkt_display',
				
				geometryAfterLoadMap			: function(instancia){}
			};
			
			this.options = this.mergeJson(this.options, opt);
		}
	};
	
	this.singleLineProfile = function(opt)
	{
		this.profile = profiles.SINGLE_LINE;
		// Configura todas as entradas configuradas pelo usuário.
		this.configureOptions(opt);
		this.init();
	};
	
	/**
	 * Construtor público para construir a interface de mapa para a manipulação
	 * de um ponto.
	 * 
	 * @returns void
	 */
	this.singlePointProfile = function(opt)
	{
		this.profile = profiles.SINGLE_POINT;
		// Configura todas as entradas configuradas pelo usuário.
		this.configureOptions(opt);
		this.init();
	};
	
	/**
	 * Construtor público para construir a interface de mapa para a manipulação
	 * de uma(s) geometria(s).
	 * 
	 * @returns void
	 */
	this.multiGeometryProfile = function(opt)
	{
		this.profile = profiles.MULTI_POLYGON;
		// Configura todas as entradas configuradas pelo usuário.
		this.configureOptions(opt);
		this.init();
	};
	
	/**
	 * Construtor público para construir a interface de mapa para a manipulação
	 * de um ponto.
	 * 
	 * @returns void
	 */
	this.multiPointProfile = function(opt)
	{
		this.profile = profiles.MULTI_POINT;
		// Configura todas as entradas configuradas pelo usuário.
		this.configureOptions(opt);
		this.init();
	};
	
	/**
	 * Inicializa a configuração e executa a página de mapas.
	 * 
	 * @returns void
	 */
	this.init = function()
	{
		// Remove o conteúdo da div caso a mesma exista.
		if($('#' + this.uiBodyDiv).length)
		{
			$('#' + this.uiBodyDiv).remove();
		}
		
		var html = this.createDivDialogBody();
		
		
		$('<div></div>').attr('id', this.uiBodyDiv).attr('title', this.options.dialogTitle).html(this.createDivDialogBody()).dialog({
			width: 		this.options.dialogWidth,
			height: 	this.options.dialogHeight,
			modal: 		this.options.dialogModal,
			resizable: 	this.options.dialogResizable
		});
		
		$('#' + this.uiContentDiv).html(this.createDivMapContent());
		
		// Estrutura básica da página.
		this.createSearchLocationForm();
		this.createLonLatInputs();
		this.createCloseButton();
		
		var map_options = {
			//controls:[],
			maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
			projection		 : new OpenLayers.Projection("EPSG:900913"),
			displayProjection: new OpenLayers.Projection("EPSG:4326"),
			Z_INDEX_BASE: {
				BaseLayer	: 0,
				Overlay		: 32,
				Feature		: 72,
				Popup		: 75,
				Control		: 90
			}
		};

		this.map = new OpenLayers.Map(this.mapDivId, map_options);
		
		this.createCommonsLayers();
		this.addDefaultMapControls();
        
        this.getMap().setCenter(new OpenLayers.LonLat(-6067265.55632, -2935181.88574), this.getOptions().defaultZoomLevel);
        
        var instancia = this.profileFatory();
        instancia.start();
	};
	
	/**
	 * Retorna uma instância da classe de implementação da manipulação
	 * de geometrias.
	 * 
	 * @returns Object.
	 */
	this.profileFatory = function()
	{
		var instancia = null;
		
		switch (this.profile)
		{
			case 1:
			case 2:
				instancia = new CIHPointProfile();
			break;
			case 3:
			case 4:
				instancia = new CIHGeometryProfile();
			break;
			case 5:
			case 6:
				instancia = new CIHLineProfile();
			break;
		}
		
		if(instancia == null)
		{
			throw "Problema ao instanciar a classe de implementação para manipulação de Geometrias [profile" + this.profile + "]";
		}
		else
		{
			instancia.configure(this);
			return instancia;
		}
	};
	
	
	/**
	 * Instancia e adiciona camadas comuns ao mapa.
	 */
	this.createCommonsLayers = function()
	{
		var gmap = new OpenLayers.Layer.Google(
			this.getOptions().layerGoogleStreets,
            {
				numZoomLevels		: 20,
				'sphericalMercator'	: true
			}
        );
        var ghyb = new OpenLayers.Layer.Google(
        	this.getOptions().layerGoogleHybrid,
            {
				type				: G_HYBRID_MAP, 
				numZoomLevels		: 20,
				'sphericalMercator'	: true
			}
        );
        var gsat = new OpenLayers.Layer.Google(
        	this.getOptions().layerGoogleSatellite,
            {
				type				: G_SATELLITE_MAP, 
				numZoomLevels		: 22,
				'sphericalMercator'	: true
			}
        );
		var gphy = new OpenLayers.Layer.Google(
			this.getOptions().layerGooglePhysical,
            {
				type				: G_PHYSICAL_MAP,
				numZoomLevels		: 22,
				'sphericalMercator'	: true
			}
        );
        
		var mapnik = new OpenLayers.Layer.OSM();
		
		this.getMap().addLayers([ghyb, gmap, gphy, gsat, mapnik]); //, shaded, hybrid, aerial
	};

	this.createLonLatInputs = function()
	{
		var inputs = "";
		inputs += "<table border='1' width='100%' cellpadding='10'><tr>";
		inputs += "		<td id='t001'><label class='label-map'>" + this.options.mapInformationLatitude + ": <br/><input type='text' class='inputbox-map' id='ponto_y' size='18'/></label></td>";
		inputs += "		<td id='t002'><label class='label-map'>" + this.options.mapInformationLongitude + ": <br/><input type='text' class='inputbox-map' id='ponto_x' size='18'/></label></td>";
		inputs += "		<td id='t003'><label class='label-map'>" + this.options.mapInformationCoordenadas + ":</label><br/><div id='box_coordenadas__'></div></td>";
		inputs += "		<td id='t004'><label class='label-map'>" + this.options.mapInformationEscala + ":<br/></label><div id='box_escala__'></div></td>";
		inputs += "		<td width='20%'><label class='label-map'>" + this.options.mapInformationProjecao + ":<br/></label><div id='precision_box__'><br/>EGSP:4326</div></td>";
		inputs += "</tr></table>";
		
		$("#table_linha3__").append(inputs);
	};
	
	/**
	 * Adiciona os controles padrões para apresentação e navegação entre os mapas.
	 */
	this.addDefaultMapControls = function ()
	{
		var layerSwitcher = new OpenLayers.Control.LayerSwitcher({
			id: 'layer-switcher',
			ascending:false,
			roundedCorner: true
		});
		
		var panZoom = new OpenLayers.Control.PanZoomBar	({
			id: 'pan-zoom',
			activate:true
		});
		
		var mousePosition = new OpenLayers.Control.MousePosition({
			id: 'mouse-position',
			div:document.getElementById("box_coordenadas__")
		});
		
		var scaleLine = new OpenLayers.Control.ScaleLine({
			id: 'scale-line',
			div:document.getElementById("box_escala__")
		});
		
		var navigation = new OpenLayers.Control.Navigation({
			id: 'navigation',
			zoomWheelEnabled: true
		});
		
		var keyboardDefaults = new OpenLayers.Control.KeyboardDefaults({
			id: 'keyboard-defaults'
		});
		
//		this.getMap().addControl (keyboardDefaults);
		this.getMap().addControl (layerSwitcher);
		this.getMap().addControl (mousePosition);
		this.getMap().addControl (scaleLine);
		this.getMap().addControl (navigation);
	};
	
	/**
	 * Ativa um controle pelo seu ID.
	 */
	this.enableControlById = function (id)
	{
		var controle = this.getMapControl(id);

		if(controle != null)
		{
			controle.activate();
		}
		return false;
	};
	
	/**
	 * Desenha a barra de consulta de endereços que utiliza o serviço da Google Maps.
	 */
	this.createSearchLocationForm = function()
	{
		var inputs = "<table border='1' width='100%' cellpadding='10'><tr>";
		inputs += "<td><label class='label-map'>" + this.options.searchLocationLabelText + ": <br/><input type='text' id='referencia_consulta' class='inputbox-map' size='50'/></label></td>";
		inputs += "<td><br/><input type='button' class='submit' id='button-busca-location' value='" + this.getOptions().searchLocationButtonText + "'/></td>";
		inputs += "<td><br/><input type='button' class='submit' id='button-limpa-busca' value='" + this.getOptions().searchLocationButtonLimpar + "'/></td>";
		inputs += "<td width='15%'>" +
				"	<label class='label-map'>" + this.getOptions().layerCamada + ":</label>" +
				"		<select id='select-layer-op' class='inputbox-map' style='height: 26px;'>" +
				"			<option value='0'>" + this.getOptions().layerGoogleHybrid + "</option>" +
				"			<option value='1'>" + this.getOptions().layerGoogleStreets + "</option>" +
				"			<option value='2'>" + this.getOptions().layerGooglePhysical + "</option>" +
				"			<option value='3'>" + this.getOptions().layerGoogleSatellite + "</option>" +
				"			<option value='4'>" + this.getOptions().layerOpenStreetMap + "</option>" +
				"		</select>" +
				"</td></tr>";
		inputs += "<tr><td colspan='3'><div id='result-consulta-localizacao'></div></td></tr></table>";
		
		inputs += "</table>";
		
		$("#table_linha1__").html(inputs);
		
		var instancia = this;
		
		// Change layer
		$('#select-layer-op').bind('change', function(){
			var index = parseInt($(this).attr('value'));
			
			var layer = instancia.getMap().layers[index];
			instancia.getMap().setBaseLayer(layer);
		});
		
		$('#referencia_consulta').focus();
		
		// Action da busca.
		$('#button-busca-location').bind('click', function(){
			// Processando a consulta.
			var query = $('#referencia_consulta').attr('value');
			
			if(query.length > 0)
			{
				$('#result-consulta-localizacao').html(
					'<center><img src="/sigbiogas/js/cih-map/img/ajax.gif" atl="ajax"/><br/>' + 
					instancia.getOptions().searchLocationProcessandoConsulta + '</center>'
				);
				
				var cihlocation = new CIHLocationSearch();
				
				cihlocation.executeSearch(instancia, query);
			}
			else
			{
				$('#result-consulta-localizacao').html(
					'<br/><div class="response-msg inf ui-corner-all"><span>' + instancia.getOptions().searchLocationInformeUmTermoAviso + '</span>' + 
					instancia.getOptions().searchLocationInformeUmTermoParaConsulta + '</div>'
				);
			}
		});
		
		$('#referencia_consulta').bind('keypress', function(event){
			var code = (event.keyCode ? event.keyCode : event.which);
			
			if(code == 13)
			{
				$('#button-busca-location').trigger('click');
				event.preventDefault();
			}
		});
		
		$('#button-limpa-busca').bind('click', function(){
			$('#result-consulta-localizacao').html('');
			$('#referencia_consulta').attr('value', '');
			$('#referencia_consulta').focus();
		});
	};
	
	/**
	 * Cria e adiciona o HTML do botão de fechar o dialog e também
	 * registra a action para fechar o dialog. 
	 */
	this.createCloseButton = function()
	{
		var inputs = "";
		inputs += "<table border='1' width='100%' cellpadding='10'><tr>";
		inputs += "		<td style='text-align:right;'><br/><input type='button' class='submit' id='button-close-dialog' value='" + this.options.dialogButtonClose + "'/></td>";
		inputs += "</tr></table>";
		
		$("#table_linha4__").append(inputs);
		
		$('#button-close-dialog').bind('click', function(){
			$('#uiBodyDiv___').dialog('close');
		});
	};
	
	/**
	 * Cria o corpo base do mapa. Utiliza as classes CSS do arquivo ui.css.
	 * 
	 * @return String div
	 */
	this.createDivMapContent = function ()
	{
		var div = "	<div id='" + this.mapDivId + "' style='width:100%; height:310px; margin:0px; padding:0px;'>&nbsp;</div>";
		
		var table = "<table border='1' width='100%'>";
		table += "<tr><td><div id='table_linha1__'></div></td></tr>";
		table += "<tr><td><div id='table_linha1_1__'></div><br/><div id='table_linha1_1_1__'></div></td></tr>";
		table += "<tr><td><div id='table_linha2__'>" + div + "</div></td></tr>";
		table += "<tr><td><div id='table_linha3__'></div></td></tr>";
		table += "<tr><td><div id='table_linha4__'></div></td></tr>";
		table += "</table>";
		
		return table;
	};
	
	/**
	 * Cria o corpo base do mapa. Utiliza as classes CSS do arquivo ui.css.
	 * 
	 * @return String div
	 */
	this.createDivDialogBody = function ()
	{
		var div = "<div id='" + this.uiContentDiv + "' style='margin:0px; padding:0px'></div>";
		
		return div;
	};
	
	/**
	 * Retorna uma referência para o objeto OpenLayers.
	 * 
	 * @returns OpenLayers.Map
	 */
	this.getMap = function()
	{
		return this.map;
	};
	
	/**
	 * Retorna as configurações da classe.
	 * 
	 * @returns {}
	 */
	this.getOptions = function()
	{
		return this.options;
	};
	
	this.getProfile = function()
	{
		return this.profile;
	};
	
	/**
	 * Retorna uma referência para o objeto OpenLayers.
	 * 
	 * @returns OpenLayers.Layer
	 */
	this.getLayerById = function(id)
	{
		var layer = null;
		
		for ( var i = 0; i < this.map.layers.length; i++)
		{
			if(this.map.layers[i] != null && this.map.layers[i].id == id)
			{
				layer = this.map.layers[i];
			}
		}
		
		return layer;
	};
	
	/**
	 * Retorna a referência direta para um controle do OpenLayers.
	 * 
	 * @return OpenLayers.Control
	 */
	this.getMapControl = function(id)
	{
		var controle = null;
		
		for ( var i = 0; i < this.map.controls.length; i++)
		{
			if(this.map.controls[i] != null && this.map.controls[i].id == id)
			{
				controle = this.map.controls[i];
			}
		}
		
		return controle;
	};
	
	/**
	 * Reprojeta uma coordenada XY na projeção 4326 para um 900913.
	 * 
	 * @returns OpenLayers.LonLat
	 */
	this.reprojetaPonto = function(x, y)
	{
		var from 	= new OpenLayers.Projection("EPSG:4326");
		var to 		= new OpenLayers.Projection("EPSG:900913");
		var point 	= new OpenLayers.LonLat(x, y);
		
		point.transform(from, to);
		
		return point;
	};
}