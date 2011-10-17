function Aguas()
{
	this.confirmDeleteRio = function()
	{
		return confirm($.msg('aguas.rio.deseja.excluir.este.rio'));
	};
	
	this.confirmDeletePoco = function()
	{
		return confirm($.msg('aguas.poco.deseja.excluir.este.poco'));
	};
	
	this.confirmDeleteNascente = function()
	{
		return confirm($.msg('aguas.nascente.deseja.excluir.esta.nascente'));
	};
	
	this.editaRio = function(id)
	{
		var url = "/sigbiogas/cadastros/propriedades/" + $('#id_propriedade').attr('value') + "/aguas/rios/" + id;
		
		$('#div-form-agua').html('<div class="ajax-progress"><br/><br/><br/>' + $.msg('processando.requisicao') + '</div>');
		$.post(url, {}, function(data){
			$('#div-form-agua').html(data);
		});
		
		return false;
	};
	
	this.editaPoco = function(id)
	{
		var url = "/sigbiogas/cadastros/propriedades/" + $('#id_propriedade').attr('value') + "/aguas/pocos/" + id;
		
		$('#div-form-agua').html('<div class="ajax-progress"><br/><br/><br/>' + $.msg('processando.requisicao') + '</div>');
		$.post(url, {}, function(data){
			$('#div-form-agua').html(data);
		});
		
		return false;
	};
	
	this.editaNascente = function(id)
	{
		var url = "/sigbiogas/cadastros/propriedades/" + $('#id_propriedade').attr('value') + "/aguas/nascentes/" + id;
		
		$('#div-form-agua').html('<div class="ajax-progress"><br/><br/><br/>' + $.msg('processando.requisicao') + '</div>');
		$.post(url, {}, function(data){
			$('#div-form-agua').html(data);
		});
		
		return false;
	};
	
	this.carregaFormularioAgua = function()
	{
		var item = $('#tipo_agua').attr('value');
		
		var url = "/sigbiogas/cadastros/propriedades/" + $('#id_propriedade').attr('value') + "/aguas/" + item + "/";
		
		$('#div-form-agua').html('<div class="ajax-progress"><br/><br/><br/>' + $.msg('processando.requisicao') + '</div>');
		
		$.post(url, {}, function(data)
		{
			$('#div-form-agua').html(data);
		});
		
		return false;
	};
}
