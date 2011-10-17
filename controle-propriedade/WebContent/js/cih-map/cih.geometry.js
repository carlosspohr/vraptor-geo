function CIHGeometryProfile()
{
	/**
	 * @type CIHMap
	 */
	this.cihmap = null;
	
	this.polygonLayer = null;
	
	/**
	 * Controle de desenho.
	 */
	this.drawControl = null;
	
	/**
	 * Controle para exclusão de geometrias.
	 */
	this.deleteControl = null;
	
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
	
	/**
	 * Método de inicialização da classe.
	 */
	this.start = function()
	{
		$("#t001,#t002").html("");
		var instancia = this;
		
		this.addLineStringToolbar();
		
		var defStyle = {
			strokeColor: "#000000", 
			strokeOpacity: "0.6", 
			strokeWidth: 2, 
			fillColor: "#000000", 
			pointRadius: 3, 
			cursor: "pointer",
			fillOpacity: "0.6"
		};
		
		var sty = OpenLayers.Util.applyDefaults(defStyle, OpenLayers.Feature.Vector.style["default"]);
		
		var sm = new OpenLayers.StyleMap({
            'default': sty,
            'temporary': {strokeColor: "#000000", fillColor: "#000000", fillOpacity: "0.6"}
        });
		
		this.polygonLayer 	= new OpenLayers.Layer.Vector("Geometrias", {
			styleMap: sm,
			displayInLayerSwitcher: false
		});
		
		this.cihmap.getMap().addLayer(this.polygonLayer);
		
		// Carregar o conteudo.
		if($(this.getCihMap().getOptions().geometryInputReadWrite).attr('value') != '')
		{
			var w = new OpenLayers.Format.WKT({
				'internalProjection': new OpenLayers.Projection("EPSG:900913"),
  				'externalProjection': new OpenLayers.Projection("EPSG:4326")
			});
			
			var wktString = $(this.getCihMap().getOptions().geometryInputReadWrite).attr('value');
			var collection = w.read(wktString);
			
			this.polygonLayer.addFeatures(collection);
		}
		
		// Carrega a ferramenta de desenho.
		this.drawControl = new OpenLayers.Control.DrawFeature(
			this.polygonLayer, 
			OpenLayers.Handler.Polygon, {
				featureAdded: function(geometry){
					
				}
		});
		
		this.cihmap.getMap().addControl(this.drawControl);
		this.drawControl.activate();
		
		this.deleteControl = new OpenLayers.Control.SelectFeature(this.polygonLayer, { 
			onSelect:function(feature){ 
				feature.layer.destroyFeatures(feature); 
			}, 
			title:'Apagar geometria', 
			displayClass: 'olControlSelectFeatureDestroy'
		});
		
		this.cihmap.getMap().addControl(this.deleteControl);
		
		// Ação do Close button.
		this.configuraCloseButtonActionListener(instancia);
		
		// Functions.
		instancia.getCihMap().getOptions().geometryAfterLoadMap();
	};
	
	this.configuraCloseButtonActionListener = function(instancia)
	{
		$('#button-close-dialog').unbind('click').bind('click', function(){
			
			if(instancia.hasGeometryStringInMap())
			{
				var writer = new OpenLayers.Format.WKT({
					'internalProjection': new OpenLayers.Projection("EPSG:900913"),
  					'externalProjection': new OpenLayers.Projection("EPSG:4326")
				});
				
				var wkt = writer.write(instancia.polygonLayer.features);
				
				$(instancia.getCihMap().getOptions().geometryInputReadWrite).attr('value', wkt);
				$(instancia.getCihMap().getOptions().geometryWKTDisplayReadOnly).attr('value', wkt);
			}
			
			$('#uiBodyDiv___').dialog('close');
		});
	};
	
	/**
	 * Retorna uma referência para o drawControl.
	 */
	this.getDrawControl = function()
	{
		return this.drawControl;
	};
	
	/**
	 * Retorna uma referência para o deleteControl.
	 */
	this.getDeleteControl = function()
	{
		return this.deleteControl;
	};
	
	/**
	 * Verifica se existe uma line-string desenhada no mapa.
	 * 
	 * @returns boolean
	 */
	this.hasGeometryStringInMap = function()
	{
		return this.polygonLayer.features.length > 0;
	};
	
	/**
	 * Desenha a barra de buttons que faz a interação com os controles do OpenLayers.
	 */
	this.addLineStringToolbar = function ()
	{
		var html = "";
		
		html += "<input type='button' class='submit' id='btOlControlNavigation' value='" + this.getCihMap().getOptions().geometryButtonNavegateGeometry + "'/>&nbsp;";
		html += "<input type='button' class='submit' id='btOlControlDeleteGeometryString' value='" + this.getCihMap().getOptions().geometryButtonRemoveGeometry + "'/>&nbsp;";
		html += "<input type='button' class='submit' id='btOlControlAddGeometryString' value='" + this.getCihMap().getOptions().geometryButtonAddGeometry + "'/>&nbsp;";
		
		$("#table_linha1_1_1__").append(html);
		
		// Registrando os listeners.
		var instancia = this;
		
		$('#btOlControlNavigation').bind('click', function(){
			instancia.getDrawControl().deactivate();
			instancia.getDeleteControl().deactivate();
		});
		$('#btOlControlAddGeometryString').bind('click', function(){
			instancia.getDrawControl().activate();
			instancia.getDeleteControl().deactivate();
		});
		$('#btOlControlDeleteGeometryString').bind('click', function(){
			instancia.getDrawControl().deactivate();
			instancia.getDeleteControl().activate();
		});
	};
	
	/**
	 * 
	 * @returns CIHMap
	 */
	this.getCihMap = function()
	{
		return this.cihmap;
	};
}