package com.unicesumar.API.controller.form;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.unicesumar.API.model.Pontuacao;
import com.unicesumar.API.model.Usuario;

public class PontuacaoForm {
	
	@NotNull @NotEmpty
	private int quantidadeAcertos;
	
	@NotNull @NotEmpty
	private int tempoGasto;
	
	@NotNull @NotEmpty
	private Long idUsuario;
	
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
	public Long getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}
	public Pontuacao converter(Usuario usuario) {
		Pontuacao pontuacao = new Pontuacao(quantidadeAcertos, tempoGasto, usuario.getNome());
		pontuacao.gerarPontuacao();
		return pontuacao;	
	}
	
	
}
