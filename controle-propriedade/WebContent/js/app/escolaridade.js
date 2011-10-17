function Escolaridade()
{
	this.confirmDelete = function()
	{
		return confirm($.msg('escolaridade.deseja.excluir'));
	};
	
	this.validaFormulario = function()
	{
		var msg = "";
		
		if($('#descricao').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('escolaridade.descricao') + " " + $.msg('requerido');
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
			$('#div_box_mensagens .jquery-message-box').html("");
			return true;
		}
		return false;
	};
}