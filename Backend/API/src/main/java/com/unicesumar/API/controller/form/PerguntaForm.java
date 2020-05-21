package com.unicesumar.API.controller.form;

import com.unicesumar.API.model.Alternativa;
import com.unicesumar.API.model.Pergunta;
import com.unicesumar.API.repository.AlternativaRepository;

public class PerguntaForm {
	private String enunciado;
	private Long[] longs;
	
	public String getEnunciado() {
		return enunciado;
	}
	public void setEnunciado(String enunciado) {
		this.enunciado = enunciado;
	}
	public Long[] getLongs() {
		return longs;
	}
	public void setLongs(Long[] longs) {
		this.longs = longs;
	}
	
	public Pergunta converter(AlternativaRepository alternativaRepository) {
		return null;
	}
}
