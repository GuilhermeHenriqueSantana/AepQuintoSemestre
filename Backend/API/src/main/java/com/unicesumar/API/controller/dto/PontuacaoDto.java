package com.unicesumar.API.controller.dto;

import java.util.ArrayList;
import java.util.List;

import com.unicesumar.API.model.Pontuacao;

public class PontuacaoDto {
	
	private Long id;
	private int quantidadeAcertos;
	private int tempoGasto;
	private double pontuacaoTotal;
	private String nomeUsuario;
	
	public PontuacaoDto(Pontuacao pontuacao) {
		this.id = pontuacao.getId();
		this.quantidadeAcertos = pontuacao.getQuantidadeAcertos();
		this.tempoGasto = pontuacao.getTempoGasto();
		this.pontuacaoTotal = pontuacao.getPontuacaoTotal();
		this.nomeUsuario = pontuacao.getNomeUsuario();
	}

	public Long getId() {
		return id;
	}

	public int getQuantidadeAcertos() {
		return quantidadeAcertos;
	}

	public int getTempoGasto() {
		return tempoGasto;
	}

	public double getPontuacaoTotal() {
		return pontuacaoTotal;
	}

	public String getNomeUsuario() {
		return nomeUsuario;
	}
	
	public static List<PontuacaoDto> converter(List<Pontuacao> pontuacoes){
		List<PontuacaoDto> pontuacaoDtos = new ArrayList<>();
		for (Pontuacao pontuacao : pontuacoes) {
			pontuacaoDtos.add(new PontuacaoDto(pontuacao));
		}
		return pontuacaoDtos;
	}
	
	
}
