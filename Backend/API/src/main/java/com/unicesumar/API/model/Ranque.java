package com.unicesumar.API.model;

public class Ranque {
	
	private Pontuacao pontuacao;
	private String nomeUsuario;
	private double pontos;
	
	public Ranque(Pontuacao pontuacao, String nomeUsuario) {
		this.pontuacao = pontuacao;
		this.nomeUsuario = nomeUsuario;
		this.pontos = pontuacao.getTempoGasto() * pontuacao.getQuantidadeAcertos();
	}
	public Pontuacao getPontuacao() {
		return pontuacao;
	}
	public void setPontuacao(Pontuacao pontuacao) {
		this.pontuacao = pontuacao;
	}
	public String getNomeUsuario() {
		return nomeUsuario;
	}
	public void setNomeUsuario(String nomeUsuario) {
		this.nomeUsuario = nomeUsuario;
	}
	public double getPontos() {
		return pontos;
	}
	public void setPontos(double pontos) {
		this.pontos = pontos;
	}
	
	
	
}
