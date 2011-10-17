function Pessoa()
{
	this.editaPessoa = function(id_p, id)
	{
		var url = "/sigbiogas/cadastros/propriedades/" + id_p + "/pessoas/" + id;
		
		$('#ui-tabs-2').html('<div class="ajax-progress"><br/><br/><br/>' + $.msg('processando.requisicao') + '</div>');
		$.get(url, {}, function(data){
			$('#ui-tabs-2').html(data);
			$('body').scrollTo(0,1500);
		});
		
		return false;
	};
	
	this.confirmDelete = function()
	{
		return confirm($.msg('pessoa.deseja.excluir.esta.pessoa'));
	};
	
	this.validaFormularioPessoa = function()
	{
		var msg = "";
		
		if($('#nomeCompleto').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('pessoa.nome.completo') + " " + $.msg('requerido');
		}
		if($('#cpf').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('pessoa.cpf') + " " + $.msg('requerido');
		}
		if(!jQuery('#cpf').validateCPF())
		{
			msg += "<br/>" + $.msg('pessoa.cpf.incorreto');
		}
		if($('#sexo').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('pessoa.sexo') + " " + $.msg('requerido');
		}

		if($('#apoioEstudo').attr('value') == 'OUTROS' && $('#apoioEstudoOutros').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('pessoa.apoio.outros') + " " + $.msg('requerido');
		}
		
		if($('#cursoProfissionalizante').attr('checked') && $('#descricaoCursoProfissionalizante').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('pessoa.qual.curso') + " " + $.msg('requerido');
		}
		
		if($('#grauRelacao').attr('value') == 'OUTRO' && $('#outroGrauRelacao').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('pessoa.grau.outro') + " " + $.msg('requerido');
		}
		
		if(msg != "")
		{
			$('#dbxm_membros .jquery-message-box').html("");
			$('#dbxm_membros .jquery-message-box').append('<div class="response-msg notice ui-corner-all">' + msg + "</div>");
			$('#dbxm_membros').slideDown('normal');
			return false;
		}
		else
		{
			$('#dbxm_membros .jquery-message-box').html("");
			return true;
		}
	};
	
	this.mostraQualApoio = function()
	{
		if($('#apoioEstudo').attr('value') == 'OUTROS')
		{
			$('#apoioEstudoOutros').attr('disabled', false);
		}
		else
		{
			$('#apoioEstudoOutros').attr('disabled', true).focus();
		}
		
		return true;
	};
	
	this.mostraInputDescricaoOutro = function()
	{
		if($('#grauRelacao').attr('value') == 'OUTRO')
		{
			$('#outroGrauRelacao').attr('disabled', false);
		}
		else
		{
			$('#outroGrauRelacao').attr('disabled', true).focus();
		}
		
		return true;
	};
	
	this.mostraInputCursoProfissionalizante = function()
	{
		if($('#cursoProfissionalizante').attr('checked'))
		{
			$('#descricaoCursoProfissionalizante').attr('disabled', false);
		}
		else
		{
			$('#descricaoCursoProfissionalizante').attr('disabled', true);
		}
		
		return true;
	};
	
	this.mostraInputClassificacao = function()
	{
		if($('#classificacao').attr('value') == 'OUTROS')
		{
			$('#biq').show('slow');
		}
		else
		{
			$('#biq').hide('slow');
		}
		
		return true;
	};
}