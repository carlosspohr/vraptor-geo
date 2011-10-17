function Propriedade()
{
	this.validaFormularioQuestionario = function()
	{
		var msg = "";
		if($('#rendimentoBrutoMensalSuinocultura').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('questionario.rendimentoBrutoMensalSuinocultura') + " " + $.msg('requerido');
		}
		if($('#rendimentoBrutoMensalSuinoculturaPorLote').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('questionario.ou.qual.rendimento.por.lote') + " " + $.msg('requerido');
		}
		if($('#rendimentoBrutoGeralPropriedadePorAno').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('questionario.rendimentoBrutoMensalSuinoculturaPorLote') + " " + $.msg('requerido');
		}
		if($('#existeDividaBancariaSuinocultura1').attr('checked') && $('#valorDividaBancariaSuinocultura').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('questionario.valor.divida') + " " + $.msg('requerido');
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
	
	this.validaFormularioMembros = function()
	{
		var msg = "";
		
		if($('#nomeCompleto').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('membro.nome.completo') + " " + $.msg('requerido');
		}
		if($('#cpf').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('membro.cpf') + " " + $.msg('requerido');
		}
		if($('#rg').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('membro.rg') + " " + $.msg('requerido');
		}
		if($('#orgaoEmissor').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('membro.orgao.emissor') + " " + $.msg('requerido');
		}
		if($('#dataEmissao').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('membro.data.emissao') + " " + $.msg('requerido');
		}
		if($('#dataNascimento').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('membro.data.nascimento') + " " + $.msg('requerido');
		}
		if($('#nacionalidade').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('membro.nacionalidade') + " " + $.msg('requerido');
		}
		if($('#naturalidade').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('membro.naturalidade') + " " + $.msg('requerido');
		}
		if($('#escolaridade').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('membro.escolaridade') + " " + $.msg('requerido');
		}
		if($('#apoioEstudo').attr('value') == 'OUTROS' || $('#apoioEstudoOutros').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('membro.apoio.outros') + " " + $.msg('requerido');
		}
		if($('#cursoProfissionalizante').attr('checked') && $('#descricaoCursoProfissionalizante').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('membro.qual.curso') + " " + $.msg('requerido');
		}
		
		var grau = false;
		
		$('input[id^="grau_"]').each(function(index, el){
			if($(el).attr('checked'))
			{
				grau = true;
			}
		});
		
		if(grau == false)
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('membro.grau.parentesco') + " " + $.msg('requerido');
		}
		if($('#grau_outro').attr('checked') && $('#outroGrauParentesco').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('membro.grau.outro') + " " + $.msg('requerido');
		}
		if($('#diasAno').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('mao.obra.dias.ano') + " " + $.msg('requerido');
		}
		if($('#horasDia').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('mao.obra.horas.dia') + " " + $.msg('requerido');
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
	};
	
	this.validaFormulario = function()
	{
		var msg = "";
		
		if($('#id_projeto_acao').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('propriedade.projeto.acao') + " " + $.msg('requerido');
		}
		
		if($('#nomePropriedade').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('propriedade.nome.propriedade') + " " + $.msg('requerido');
		}
		if($('#area').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('propriedade.area') + " " + $.msg('requerido');
		}
		if($('#matricula').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('propriedade.matricula') + " " + $.msg('requerido');
		}
		
		if($('#propriedade.classificacao').attr('value') == 'OUTROS' && $('#outrosClassificacao').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('propriedade.classificacao.qual') + " " + $.msg('requerido');
		}
		if($('#id_cidade').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('propriedade.cidade') + " " + $.msg('requerido');
		}
		if($('#endereco').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('propriedade.endereco') + " " + $.msg('requerido');
		}
		if($('#numero').attr('value') == '')
		{
			msg += "<br/>" + $.msg('o.campo') + " " + $.msg('propriedade.numero') + " " + $.msg('requerido');
		}
		
		if($('#pontoX').attr('value') == '' || $('#pontoY').attr('value') == '')
		{
			msg += "<br/>" + $.msg('propriedade.marque.o.ponto.da.propriedade');
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
	
	this.mostraRadiosTipoContrato = function()
	{
		if($('#contratado').attr('checked'))
		{
			$('#div_tipo_contrato').show('normal');
		}
		else
		{
			$('#div_tipo_contrato').hide('slow');
		}
		
		return true;
	};
	
	this.confirmDeletePropriedade = function()
	{
		return confirm($.msg('propriedade.deseja.excluir.esta.propriedade'));
	};
	
	this.confirmDelete = function()
	{
		return confirm($.msg('deseja.excluir.este.membro.da.propriedade'));
	};
	
	this.mostraDivGrauRelacao = function()
	{
		if($('#tipo_familiar').attr('checked'))
		{
			$('#dotm__div').show('normal');
		}
		else
		{
			$('#dotm__div').hide('slow');
		}
		
		return true;
	};
	
	this.mostraInputDescricaoOutro = function()
	{
		if($('#grau_outro').attr('checked'))
		{
			$('#dccgo').show('slow');
		}
		else
		{
			$('#dccgo').hide('slow');
		}
		
		return true;
	};
	
	this.mostraInputCursoProfissionalizante = function()
	{
		if($('#cursoProfissionalizante').attr('checked'))
		{
			$('#dcp').show('slow');
		}
		else
		{
			$('#dcp').hide('slow');
		}
		
		return true;
	};
	
	this.mostraInputClassificacao = function()
	{
		if($('#classificacao').attr('value') == 'OUTROS')
		{
			$('#outrosClassificacao').attr('disabled', false);
		}
		else
		{
			$('#outrosClassificacao').attr('disabled', true);
		}
		
		return true;
	};
	
	this.buscaCidadesPorEstado = function()
	{
		if($('#id_estado').attr('value') != 'S')
		{
			var url = "/sigbiogas/cidades/";
			var params = {
				id : $('#id_estado').attr('value')
			};
			
			$('#div_cidades').html("<img alt='loading' src='/sigbiogas/templates/sisui/css/img/ajax.gif'/>");
			
			$.post(url, params, function(data){
				$('#div_cidades').html(data);
			});
		}
		else
		{
			$('#div_cidades').html('<br/><i>' + $.msg('propriedade.cidade.selecione.um.estado') + '</i>');
		}
		return false;
	};
	
	this.buscaCidadesPorEstadoConsultas = function(nomeParam)
	{
		if($('#id_estado').attr('value') != 'S')
		{
			var url = "/sigbiogas/cidades-consultas/";
			var params = {
				id : $('#id_estado').attr('value'),
				classe: nomeParam
			};
			
			$('#div_cidades').html("<img alt='loading' src='/sigbiogas/templates/sisui/css/img/ajax.gif'/>");
			
			$.post(url, params, function(data){
				$('#div_cidades').html(data);
			});
		}
		else
		{
			$('#div_cidades').html('<br/><i>' + $.msg('propriedade.cidade.selecione.um.estado') + '</i>');
		}
		return false;
	};
}