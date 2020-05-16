package com.unicesumar.API.model;

public class Pontuacao {

	private Integer id;
	private int quantidadeAcertos;
	private double tempoGasto;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public int getQuantidadeAcertos() {
		return quantidadeAcertos;
	}
	public void setQuantidadeAcertos(int quantidadeAcertos) {
		this.quantidadeAcertos = quantidadeAcertos;
	}
	public double getTempoGasto() {
		return tempoGasto;
	}
	public void setTempoGasto(double tempoGasto) {
		this.tempoGasto = tempoGasto;
	}
	
	
}
