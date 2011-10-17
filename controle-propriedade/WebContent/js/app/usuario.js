function Usuario()
{
	this.confirmDelete = function()
	{
		return confirm($.msg('usuario.deseja.excluir'));
	};
	
	this.validaFormulario = function()
	{
		var msg = "";
		
		if($('#nome').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('usuario.nome.completo') + " " + $.msg('requerido');
		}
		if($('#organizacao').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('usuario.organizacao') + " " + $.msg('requerido');
		}
		if($('#loginf').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('usuario.login') + " " + $.msg('requerido');
		}
		if($('#id').attr('value') == '')
		{
			if($('#senha').attr('value') == '')
			{
				msg += "<br/>" + $.msg('o.campo') + " " + $.msg('usuario.senha') + " " + $.msg('requerido');
			}
		}
		if($('#grupoUsuario').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('usuario.grupo.usuario') + " " + $.msg('requerido');
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