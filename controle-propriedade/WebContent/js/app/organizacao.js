function Organizacao()
{
	this.confirmDelete = function()
	{
		return confirm($.msg('organizacao.deseja.excluir'));
	};
	
	this.confirmDeleteProjeto = function()
	{
		return confirm($.msg('organizacao.projetos.deseja.excluir.projeto'));
	};
	
	this.validaFormulario = function()
	{
		var msg = "";
		
		if($('#tipo_fisico').attr('checked'))
		{
			if($('#nomeCompleto').attr('value') == '')
			{
				msg += "<br/>" + $.msg('o.campo') + " " + $.msg('organizacao.nome.completo') + " " + $.msg('requerido');
			}
			if($('#cpf').attr('value') == '')
			{
				msg += "<br/>" + $.msg('o.campo') + " " + $.msg('organizacao.cpf') + " " + $.msg('requerido');
			}
		}
		else
		{
			if($('#razaoSocial').attr('value') == '')
			{
				msg += "<br/>" + $.msg('o.campo') + " " + $.msg('organizacao.razao.social') + " " + $.msg('requerido');
			}
			if($('#nomeFantasia').attr('value') == '')
			{
				msg += "<br/>" + $.msg('o.campo') + " " + $.msg('organizacao.nome.fantasia') + " " + $.msg('requerido');
			}
			if($('#cnpj').attr('value') == '')
			{
				msg += "<br/>" + $.msg('o.campo') + " " + $.msg('organizacao.cnpj') + " " + $.msg('requerido');
			}
		}
		if($('#tipoInstituicao').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('organizacao.tipo.instituicao') + " " + $.msg('requerido');
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
	
	this.mudaTipoOrganizacao = function()
	{
		if($('#tipo_fisico').attr('checked'))
		{
			$('#box_juridico').hide('slow');
			$('#box_fisico').show('slow');
		}
		if($('#tipo_juridico').attr('checked'))
		{
			$('#box_fisico').hide('slow');
			$('#box_juridico').show('slow');
		}
		return true;
	};
}