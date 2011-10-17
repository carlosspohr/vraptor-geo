function Plantel()
{
	this.confirmDelete = function()
	{
		return confirm($.msg('deseja.excluir.este.plantel'));
	};
	
	this.carregaFormularioTipoPlantel = function(cultura, id_propriedade, id_plantel)
	{
		if(cultura == null || cultura == undefined)
		{
			cultura = $('#tipo_plantel').attr('value').toLowerCase();
		}
		cultura = cultura.toLowerCase();
		
		if(cultura != '')
		{
			var url = "/sigbiogas/cadastros/propriedades/" + id_propriedade + "/planteis/" + cultura + "/";
		
			var params = null;
			
			if(id_plantel != null && id_plantel != undefined)
			{
				url = url + id_plantel;
			}
			
			$('#div-form-plantel').html('<div class="ajax-progress"><br/><br/><br/>Processando a requisição....</div>');
			
			$.post(url, params, function(data)
			{
				$('#div-form-plantel').html(data);
			});
		}
		
		return false;
	};
}
