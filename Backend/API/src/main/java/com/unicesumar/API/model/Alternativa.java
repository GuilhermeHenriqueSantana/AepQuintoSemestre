package com.unicesumar.API.model;

public class Alternativa {

	private Integer id;
	private String enunciado;
	private boolean verdadeira;
	private String justificativa;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
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
	
	
	
}
