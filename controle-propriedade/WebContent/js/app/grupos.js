function GrupoUsuario()
{
	this.confirmDelete = function()
	{
		return confirm($.msg('grupo.usuario.deseja.excluir'));
	};
	
	this.validaFormulario = function()
	{
		var msg = "";
		
		if($('#nome').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('grupo.usuario.nome') + " " + $.msg('requerido');
		}
		if($('#organizacao').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('grupo.usuario.organizacao') + " " + $.msg('requerido');
		}
		if(tinyMCE.get('descricao').getContent() == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('grupo.usuario.descricao') + " " + $.msg('requerido');
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