package com.unicesumar.API.controller.form;

import com.unicesumar.API.model.Pontuacao;
import com.unicesumar.API.model.Usuario;
import com.unicesumar.API.repository.UsuarioRepository;

public class PontuacaoForm {
	private int quantidadeAcertos;
	private int tempoGasto;
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
