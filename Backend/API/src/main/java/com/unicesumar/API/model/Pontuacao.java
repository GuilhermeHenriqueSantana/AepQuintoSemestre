package com.unicesumar.API.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Pontuacao {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private int quantidadeAcertos;
	private int tempoGasto;
	private double pontuacaoTotal;
	private String nomeUsuario;
	
	public Pontuacao() {
		
	}
		
	public Pontuacao(int quantidadeAcertos, int tempoGasto, String nomeUsuario) {
		this.quantidadeAcertos = quantidadeAcertos;
		this.tempoGasto = tempoGasto;
		this.nomeUsuario = nomeUsuario;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Pontuacao other = (Pontuacao) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getQuantidadeAcertos() {
		return quantidadeAcertos;
	}
	public void setQuantidadeAcertos(int quantidadeAcertos) {
		this.quantidadeAcertos = quantidadeAcertos;
	}
	public int getTempoGasto() {
		return tempoGasto;
	}
	public void setTempoGasto(int tempoGasto) {
		this.tempoGasto = tempoGasto;
	}
	public double getPontuacaoTotal() {
		return pontuacaoTotal;
	}
	public void setPontuacaoTotal(double pontuacaoTotal) {
		this.pontuacaoTotal = pontuacaoTotal;
	}
	public String getNomeUsuario() {
		return nomeUsuario;
	}
	public void setNomeUsuario(String nomeUsuario) {
		this.nomeUsuario = nomeUsuario;
	}

	public void gerarPontuacao() {
		//this.pontuacaoTotal = (1000 * 60 * quantidadeAcertos)/(tempoGasto/100);
		this.pontuacaoTotal = (2000 * quantidadeAcertos)+(-tempoGasto/1000+1001);
	}
	
	
	
}
