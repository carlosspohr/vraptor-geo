function FinanceiroPropriedade()
{
	this.editaFinanceiro = function(id, id_p)
	{
		var url = "/sigbiogas/cadastros/propriedades/" + id_p + "/financeiro/" + id;
		
		$('#ui-tabs-4').html('<div class="ajax-progress"><br/><br/><br/>' + $.msg('processando.requisicao') + '</div>');
		$.get(url, {}, function(data){
			$('#ui-tabs-4').html(data);
			$('body').scrollTo(0,1500);
		});
		
		return false;
	};
	
	this.confirmDeleteFinanceiroPropriedade = function()
	{
		return confirm($.msg('financeiro.deseja.excluir'));
	};

	this.salvaFormularioFinanceiro = function()
	{
		if(this.validaFormularioFinanceiro() == true)
		{
			var params = $('#form-financeiro').serialize();
			
			$.post("/sigbiogas/cadastros/propriedades/financeiro/save/", params, function(data){
				$('#ui-tabs-1').html(data);
			});
			return false;
		}
		else
		{
			return false;
		}
	};
	
	this.validaFormularioFinanceiro = function()
	{
		var msg = "";
		if($('#id_tipo_receita_despesa').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('financeiro.tipo.receita.despesa') + " " + $.msg('requerido');
		}
		if($('#valorUnitario').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('financeiro.valor.unitario') + " " + $.msg('requerido');
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