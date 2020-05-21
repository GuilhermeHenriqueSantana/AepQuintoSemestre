package com.unicesumar.API.controller.dto;

import java.util.ArrayList;
import java.util.List;

import com.unicesumar.API.model.Alternativa;
import com.unicesumar.API.model.Pergunta;

public class PerguntaDto {
	private Long id;
	private String enunciado;
	private List<AlternativaDto> alternativas = new ArrayList<AlternativaDto>();
	
	public PerguntaDto(Pergunta pergunta) {
		this.id = pergunta.getId();
		this.enunciado = pergunta.getEnunciado();
		for (Alternativa alternativa : pergunta.getAlternativas()) {
			this.alternativas.add(new AlternativaDto(alternativa));			
		}
	}
	
	public Long getId() {
		return id;
	}
	public String getEnunciado() {
		return enunciado;
	}
	public List<AlternativaDto> getAlternativas() {
		return alternativas;
	}
	
	public static List<PerguntaDto> converter(List<Pergunta> perguntas) {
		List<PerguntaDto> perguntaDtos = new ArrayList<>();
		for (Pergunta pergunta : perguntas) {
			perguntaDtos.add(new PerguntaDto(pergunta));
		}
		return perguntaDtos;
	}
	
}
