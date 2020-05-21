package com.unicesumar.API.controller.form;

import com.unicesumar.API.model.Alternativa;

public class AlternativaForm {
	
	private String enunciado;
	private boolean verdadeira;
	private String justificativa;
	
	public String getEnunciado() {
		return enunciado;
	}
	public void setEnunciado(String enunciado) {
		this.enunciado = enunciado;
	}
	public boolean isVerdadeira() {
		return verdadeira;
	}
	public void setVerdadeira(boolean verdadeira) {
		this.verdadeira = verdadeira;
	}
	public String getJustificativa() {
		return justificativa;
	}
	public void setJustificativa(String justificativa) {
		this.justificativa = justificativa;
	}
	public Alternativa converter() {
		return new Alternativa(enunciado, verdadeira, justificativa);
	}
	
	
	
	
}
