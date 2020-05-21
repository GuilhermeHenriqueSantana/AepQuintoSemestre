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

import com.unicesumar.API.controller.dto.PerguntaDto;
import com.unicesumar.API.controller.form.PerguntaForm;
import com.unicesumar.API.model.Pergunta;
import com.unicesumar.API.repository.AlternativaRepository;
import com.unicesumar.API.repository.PerguntaRepository;

@RestController
@RequestMapping("/pergunta")
public class PerguntaController {
	
	@Autowired
	PerguntaRepository perguntaRepository;
	
	@Autowired
	AlternativaRepository alternativaRepository;

	@GetMapping
	public ResponseEntity<List<PerguntaDto>> lista(){
		List<Pergunta> perguntas = perguntaRepository.findAll();	
		return ResponseEntity.ok(PerguntaDto.converter(perguntas));
	}
	
	/*
	@PostMapping
	public ResponseEntity<PerguntaDto> cadastrar(@RequestBody PerguntaForm form){
		Pergunta pergunta = form.converter(alternativaRepository);
		Pontuacao pontuacao = form.converter(usuario);	
		usuario.setPontuacao(pontuacao);
		pontuacaoRepository.save(pontuacao);
		usuarioRepository.save(usuario);
		return ResponseEntity.ok(new PontuacaoDto(pontuacao));
	}
	*/
	
	
	@GetMapping("/{id}")
	public ResponseEntity<PerguntaDto> detalhar(@PathVariable Long id) {
		Optional<Pergunta> pergunta = perguntaRepository.findById(id);
		if(pergunta.isPresent()) {
			return ResponseEntity.ok(new PerguntaDto(pergunta.get()));			
		}
		return ResponseEntity.notFound().build();
	}
	
}
