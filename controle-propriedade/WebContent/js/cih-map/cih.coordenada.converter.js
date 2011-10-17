
/**
 * Classe que contém a implementação de um jQuery-UI dialog com a apresentação
 * de camadas de mapas com lógicas implementadas para trabalhar com pontos e 
 * geometrias.
 * 
 * @returns {CIHMap}
 */
function CIHCoordenadaConverter()
{
	this.cihmap = null;
		
	this.init = function(cihMapInstance)
	{
		this.cihmap = cihMapInstance;
		
		$('body').append('<div id="divCoordenadaConverterBaseDialog"></div>');
		
		var code = "";
	};
	
}