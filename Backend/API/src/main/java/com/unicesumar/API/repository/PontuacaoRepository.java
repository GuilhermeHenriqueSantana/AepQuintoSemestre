package com.unicesumar.API.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.unicesumar.API.model.Pontuacao;

public interface PontuacaoRepository extends JpaRepository<Pontuacao, Long> {
	
	@Query("select p from Pontuacao p order by p.pontuacaoTotal desc")
	List<Pontuacao> carregarOrdenado();
}
