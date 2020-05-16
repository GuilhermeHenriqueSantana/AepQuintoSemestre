package com.unicesumar.API.model;

public class Usuario {

	private Integer id;
	private String nome;
	private String senha;
	private Pontuacao pontuacao;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
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
	public Pontuacao getPontuacao() {
		return pontuacao;
	}
	public void setPontuacao(Pontuacao pontuacao) {
		this.pontuacao = pontuacao;
	}
	
	
}
