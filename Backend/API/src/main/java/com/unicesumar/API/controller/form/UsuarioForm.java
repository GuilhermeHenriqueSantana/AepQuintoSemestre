package com.unicesumar.API.controller.form;

import com.unicesumar.API.model.Usuario;

public class UsuarioForm {
	
	private String nome;
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public Usuario converter() {
		return new Usuario(nome);
	}
	
}
