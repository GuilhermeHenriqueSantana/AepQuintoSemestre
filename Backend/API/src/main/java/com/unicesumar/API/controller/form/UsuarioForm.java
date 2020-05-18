package com.unicesumar.API.controller.form;

import com.unicesumar.API.model.Usuario;

public class UsuarioForm {
	
	private String nome;
	private String senha;
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	public Usuario converter() {
		return new Usuario(nome, senha);
	}
	
}
