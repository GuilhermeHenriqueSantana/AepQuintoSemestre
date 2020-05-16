package com.unicesumar.API.model;

import java.util.List;

public class Pergunta {

	private Integer id;
	private String enunciado;
	private List<Alternativa> alternativas;
	
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
	public List<Alternativa> getAlternativas() {
		return alternativas;
	}
	public void setAlternativas(List<Alternativa> alternativas) {
		this.alternativas = alternativas;
	}
	
	
}
