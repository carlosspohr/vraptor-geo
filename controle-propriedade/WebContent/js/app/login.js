function Login()
{
	
	this.validaFormulario = function()
	{
		var msg = "";
		
		if($('#loginf').attr('value') == '')
		{
			msg += "<br/>" + $.msg('login.informe.login');
		}
		if($('#senha').attr('value') == '')
		{
			msg += "<br/>" + $.msg('login.informe.senha');
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