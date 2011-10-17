function InstalacaoProdutiva()
{
	this.editar = function(id, id_p)
	{
		var url = "/sigbiogas/cadastros/propriedades/" + id_p + "/instalacoes-produtivas/" + id + "/";
			
		$.post(url, {}, function(data){
			$('#ui-tabs-5').html(data);
			$('body').scrollTo(0,1500);
		});
		
		return false;
	};
	
	this.confirmDelete = function()
	{
		return confirm($.msg('instalacao.produtiva.deseja.excluir'));
	};
	
	this.validaFormulario = function()
	{
		var msg = "";
		
		var tipo = false;
		
		$('input[id^="tipo_"]').each(function(index, el){
			if($(el).attr('checked'))
			{
				tipo = true;
			}
		});
		
		if(tipo == false)
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('instalacao.produtiva.tipo') + " " + $.msg('requerido');
		}
		
		if($('#tipo_outras').attr('checked') == true && $('#tipoOutras').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('instalacao.produtiva.outras.qual') + " " + $.msg('requerido');
		}
		if($('#areaInstalacao').attr('value') == "")
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('instalacao.produtiva.area') + " " + $.msg('requerido');
		}
		
		var aguaChuva = false;

		$('input[id^="tiposAguaChuva"]').each(function(index, el){
			if($(el).attr('checked'))
			
			{
				aguaChuva = true;
			}
		});
		
		if(aguaChuva == false)
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('instalacao.produtiva.agua.chuva') + " " + $.msg('requerido');
		}
		
		if($('#raspagem').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('instalacao.produtiva.raspagem.dias.cada') + " " + $.msg('requerido');
		}
		if($('#quantidadeAguaLavavem').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('instalacao.produtiva.agua.lavagem') + " " + $.msg('requerido');
		}
		
		if(msg != "")
		{
			$('#div_box_mensagens .jquery-message-box').html("");
			$('#div_box_mensagens .jquery-message-box').append('<div class="response-msg notice ui-corner-all">' + msg + "</div>");
			$('#div_box_mensagens').slideDown('normal');
			
			return false;
		}
		else
		{
			return true;
		}
	};
}