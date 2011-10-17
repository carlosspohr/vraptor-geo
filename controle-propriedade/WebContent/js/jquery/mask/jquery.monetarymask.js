/**
 * Plugin para mascara monetária para o jQuery.
 * 
 * @author Carlos A. Junior (carlosjrcabello@gmail.com)
 */
jQuery.fn.parse_monetary = function ()
{
	var valor = this.val();
	var n = 0;
	if(valor == null || valor == '')
	{
		return n;
	}
	else
	{
		// 23.456,50 --> 23456.50
		valor = valor.replace(/\,/g, '|');
		valor = valor.replace(/\./g, '');
		valor = valor.replace(/\|/g, '.');
		
		return parseFloat(valor);
	}
};

jQuery.fn.aplica_mascara = function (input, mascara)
{
	var valor = input.val();
	
	var tvalor = "";
	var ret = "";
	var caracter = "#";
	var separador = "|";
	
	
	var mascara_utilizar = "";
	
	var valor = valor.replace(/^\s+|\s+$/g,"");
	
	if (valor == "")
	{
		return valor;
	}
	var temp = mascara.split(separador);
	var dif = 1000;
	
	var valorm = valor;
	for (var i=0; i < valor.length;i++)
	{
		if (!isNaN(valor.substr(i,1)))
		{
			var tvalor = tvalor + valor.substr(i,1);
		}
	}
	valor = tvalor;
	
	for (var i = 0; i < temp.length;i++)
	{
		var mult = "";
		var validar = 0;
		
		for (var j=0;j<temp[i].length;j++){
			if (temp[i].substr(j,1) == "]"){
				temp[i] = temp[i].substr(j+1);
				break;
			}
			if (validar == 1)mult = mult + temp[i].substr(j,1);
			if (temp[i].substr(j,1) == "[")validar = 1;
		}
		for (var j=0;j<valor.length;j++){
			temp[i] = mult + temp[i];
		}
	}
	
	if (temp.length == 1)
	{
		var mascara_utilizar = temp[0];
		var mascara_limpa = "";
		for (var j=0;j<mascara_utilizar.length;j++){
			if (mascara_utilizar.substr(j,1) == caracter){
				mascara_limpa = mascara_limpa + caracter;
			}
		}
		tam = mascara_limpa.length;
	}
	else
	{
		for (var i=0;i<temp.length;i++)
		{
			var mascara_limpa = "";
			for (var j=0;j<temp[i].length;j++)
			{
				if (temp[i].substr(j,1) == caracter){
					mascara_limpa = mascara_limpa + caracter;
				}
			}
			if (valor.length > mascara_limpa.length)
			{
				if (dif > (valor.length - mascara_limpa.length)){
					dif = valor.length - mascara_limpa.length;
					mascara_utilizar = temp[i];
					tam = mascara_limpa.length;
				}
			}
			else if (valor.length < mascara_limpa.length)
			{
				if (dif > (mascara_limpa.length - valor.length))
				{
					dif = mascara_limpa.length - valor.length;
					mascara_utilizar = temp[i];
					tam = mascara_limpa.length;
				}
			}
			else
			{
				mascara_utilizar = temp[i];
				tam = mascara_limpa.length;
				
				break;
			}
		}
	}
	
	if (valor.length > tam)
	{
		valor = valor.substr(0,tam);
	}
	else if (valor.length < tam)
	{
		var masct = "";
		var j = valor.length;
		for (var i = mascara_utilizar.length-1;i>=0;i--)
		{
			if (j == 0) break;
			if (mascara_utilizar.substr(i,1) == caracter){
				j--;
			}
			masct = mascara_utilizar.substr(i,1) + masct;
		}
		mascara_utilizar = masct;
	}
	
	j = mascara_utilizar.length -1;
	
	for (var i = valor.length - 1;i>=0;i--)
	{
		if (mascara_utilizar.substr(j,1) != caracter)
		{
			ret = mascara_utilizar.substr(j,1) + ret;
			j--;
		}
		ret = valor.substr(i,1) + ret;
		j--;
	}
	
	input.val(ret);
};

jQuery.fn.money = function (mascara)
{
	if(!mascara)
	{
		mascara = "[###.]###,##";
	}
	var input = this;
	input.bind('keyup', function(){
		jQuery.fn.aplica_mascara(input, mascara);
	}).attr('style', 'text-align:right;');
	
};

jQuery.fn.formatMoney = function ()
{
	var num = $(this).attr('value');
	
	num = num.toString().replace(/\$|\,/g,'');
				
	if(isNaN(num))
	{
		num = "0";
	}
	
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*100+0.50000000001);
	cents = num%100;
	num = Math.floor(num/100).toString();
	
	if(cents<10)
	{
		cents = "0" + cents;
	}
	
	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	{
		num = num.substring(0, num.length -(4*i+3)) + '.' + num.substring(num.length-(4*i+3));
	}
	var ret = (((sign)?'':'-') + num + ',' + cents);
	
	$(this).attr('value', ret);
};