package com.wp.carlos4web.cpropriedades.main;

import java.util.Locale;
import java.util.ResourceBundle;

public class Teste {
	public static void main(String[] args) {
		Locale[] locales = Locale.getAvailableLocales();
		
		for (Locale locale : locales)
		{
			System.out.println(ResourceBundle.getBundle("messages", locale).getString("erro.validacao"));
			
			String s = ResourceBundle.getBundle("messages", locale).getString("erro.validacao");
			
			System.out.println(locale);
		}
	}
}
