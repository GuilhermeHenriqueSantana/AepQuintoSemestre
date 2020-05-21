package com.unicesumar.API.controller.form;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
		List<Alternativa> alternativas = new ArrayList<Alternativa>();
		for (Long long1 : longs) {
			Optional<Alternativa> alternativa = alternativaRepository.findById(long1);
			if(alternativa.isPresent()) {
				alternativas.add(alternativa.get());		
			}
		}
		return new Pergunta(enunciado, alternativas);
	}
}
