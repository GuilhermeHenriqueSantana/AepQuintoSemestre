package com.unicesumar.API.controller.dto;

import java.util.ArrayList;
import java.util.List;

import com.unicesumar.API.model.Usuario;

public class UsuarioDto {
	private Long id;
	private String nome;
	private double pontuacaoTotal;
	
	public UsuarioDto(Usuario usuario) {
		this.id = usuario.getId();
		this.nome = usuario.getNome();
		if(usuario.getPontuacao() != null) {
			this.pontuacaoTotal = usuario.getPontuacao().getPontuacaoTotal();			
		}
	}

	public Long getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public double getPontuacaoTotal() {
		return pontuacaoTotal;
	}
	
	public static List<UsuarioDto> converter(List<Usuario> usuarios){
		List<UsuarioDto> usuarioDtos = new ArrayList<>();
		for (Usuario usuario : usuarios) {
			usuarioDtos.add(new UsuarioDto(usuario));
		}
		return usuarioDtos;
	}
	
	
}
