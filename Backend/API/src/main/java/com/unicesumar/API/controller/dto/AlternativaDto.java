package com.unicesumar.API.controller.dto;

import java.util.ArrayList;
import java.util.List;

import com.unicesumar.API.model.Alternativa;

public class AlternativaDto {

	private Long id;
	private String enunciado;
	private boolean verdadeira;
	private String justificativa;
	
	public AlternativaDto(Alternativa alternativa) {
		this.id = alternativa.getId();
		this.enunciado = alternativa.getEnunciado();
		this.verdadeira = alternativa.isVerdadeira();
		this.justificativa = alternativa.getJustificativa();
	}
	
	public Long getId() {
		return id;
	}
	public String getEnunciado() {
		return enunciado;
	}
	public boolean isVerdadeira() {
		return verdadeira;
	}
	public String getJustificativa() {
		return justificativa;
	}

	public static List<AlternativaDto> converter(List<Alternativa> alternativas) {
		List<AlternativaDto> alternativaDtos = new ArrayList<>();
		for (Alternativa alternativa : alternativas) {
			alternativaDtos.add(new AlternativaDto(alternativa));
		}
		return alternativaDtos;
	}
	
}
