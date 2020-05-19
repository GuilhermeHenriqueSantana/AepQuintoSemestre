package com.unicesumar.API.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unicesumar.API.controller.dto.PontuacaoDto;
import com.unicesumar.API.controller.form.PontuacaoForm;
import com.unicesumar.API.model.Pontuacao;

import com.unicesumar.API.repository.PontuacaoRepository;
import com.unicesumar.API.repository.UsuarioRepository;


@RestController
@RequestMapping("/pontuacao")
public class PontuacaoController {
	@Autowired
	PontuacaoRepository pontuacaoRepository;
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	@GetMapping
	public ResponseEntity<List<PontuacaoDto>> lista(){
		List<Pontuacao> pontuacoes = pontuacaoRepository.findAll();	
		return ResponseEntity.ok(PontuacaoDto.converter(pontuacoes));
	}
	
	
	@PostMapping
	public ResponseEntity<PontuacaoDto> cadastrar(@RequestBody PontuacaoForm form){
		Pontuacao pontuacao = form.converter(usuarioRepository);
		pontuacaoRepository.save(pontuacao);
		return ResponseEntity.ok(new PontuacaoDto(pontuacao));
	}
	
	
}
