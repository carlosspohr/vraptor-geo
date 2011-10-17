function CIHLineProfile()
{
	/**
	 * @type CIHMap
	 */
	this.cihmap = null;
	
	this.lineLayer = null;
	
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
			strokeColor: "#87CEFA", 
			strokeOpacity: "0.9", 
			strokeWidth: 2, 
			fillColor: "blue", 
			pointRadius: 3, 
			cursor: "pointer"
		};
		
		var sty = OpenLayers.Util.applyDefaults(defStyle, OpenLayers.Feature.Vector.style["default"]);
		
		var sm = new OpenLayers.StyleMap({
            'default': sty,
            'temporary': {strokeColor: "red", fillColor: "red"}
        });
		
		this.lineLayer 	= new OpenLayers.Layer.Vector("Line Layer", {
			styleMap: sm
		});
		
		this.cihmap.getMap().addLayer(this.lineLayer);
		
		// Carregar o conteudo.
		if($(this.getCihMap().getOptions().lineStringHTMLWriteToId).attr('value') != '')
		{
			var w = new OpenLayers.Format.WKT();
			
			var wktString = $(this.getCihMap().getOptions().lineStringHTMLWriteToId).attr('value');
			
			var collection = w.read(wktString);
			this.lineLayer.addFeatures(collection);
		}
		
		// Carrega a ferramenta de desenho.
		this.drawControl = new OpenLayers.Control.DrawFeature(
			this.lineLayer, 
			OpenLayers.Handler.Path, {
				featureAdded: function(geometry){
					
				}
		});
		
		this.cihmap.getMap().addControl(this.drawControl);
		this.drawControl.activate();
		
		this.deleteControl = new OpenLayers.Control.SelectFeature(this.lineLayer, { 
			onSelect:function(feature){ 
				feature.layer.destroyFeatures(feature); 
			}, 
			title:'Apagar geometria', 
			displayClass: 'olControlSelectFeatureDestroy'
		});
		
		this.cihmap.getMap().addControl(this.deleteControl);
		
		// Ação do Close button.
		this.configuraCloseButtonActionListener(instancia);
	};
	
	this.configuraCloseButtonActionListener = function(instancia)
	{
		$('#button-close-dialog').unbind('click').bind('click', function(){
			
			if(instancia.hasLineStringInMap())
			{
				var writer = new OpenLayers.Format.WKT();
				
				var wkt = writer.write(instancia.lineLayer.features);
				
				$(instancia.getCihMap().getOptions().lineStringHTMLWriteToId).attr('value', wkt);
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
	this.hasLineStringInMap = function()
	{
		return this.lineLayer.features.length > 0;
	};
	
	/**
	 * Desenha a barra de buttons que faz a interação com os controles do OpenLayers.
	 */
	this.addLineStringToolbar = function ()
	{
		var html = "";
		
		html += "<input type='button' class='submit' id='btOlControlNavigation' value='Navegar no Mapa'/>&nbsp;";
		html += "<input type='button' class='submit' id='btOlControlDeleteLineString' value='Excluir Linha'/>&nbsp;";
		html += "<input type='button' class='submit' id='btOlControlAddLineString' value='Adicionar Linha'/>&nbsp;";
		
		$("#table_linha1_1_1__").append(html);
		
		// Registrando os listeners.
		var instancia = this;
		
		$('#btOlControlNavigation').bind('click', function(){
			instancia.getDrawControl().deactivate();
			instancia.getDeleteControl().deactivate();
		});
		$('#btOlControlAddLineString').bind('click', function(){
			instancia.getDrawControl().activate();
			instancia.getDeleteControl().deactivate();
		});
		$('#btOlControlDeleteLineString').bind('click', function(){
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