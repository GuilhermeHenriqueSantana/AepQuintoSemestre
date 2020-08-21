package com.unicesumar.API.controller.form;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.unicesumar.API.model.Usuario;

public class UsuarioForm {
	
	@NotNull(message = "{nome.not.null}") @NotEmpty(message = "{nome.not.blank}") @Size(message = "{nome.size}", min = 5, max = 15)
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
