package com.unicesumar.API.controller;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unicesumar.API.controller.dto.PontuacaoDto;
import com.unicesumar.API.controller.form.PontuacaoForm;
import com.unicesumar.API.model.Pontuacao;
import com.unicesumar.API.model.Usuario;
import com.unicesumar.API.repository.PontuacaoRepository;
import com.unicesumar.API.repository.UsuarioRepository;


@RestController
@RequestMapping("/pontuacao")
public class PontuacaoController {
	@Autowired
	PontuacaoRepository pontuacaoRepository;
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	@CrossOrigin
	@GetMapping
	@Transactional
	public ResponseEntity<List<PontuacaoDto>> lista(){
		List<Pontuacao> pontuacoes = pontuacaoRepository.carregarOrdenado();	
		return ResponseEntity.ok(PontuacaoDto.converter(pontuacoes));
	}
	
	@CrossOrigin
	@PostMapping
	@Transactional
	public ResponseEntity<PontuacaoDto> cadastrar(@RequestBody PontuacaoForm form){
		Usuario usuario =  usuarioRepository.getOne(form.getIdUsuario());
		Pontuacao pontuacao = form.converter(usuario);	
		Long idRemover = null;
		if(usuario.getPontuacao() != null) {	
			idRemover = usuario.getPontuacao().getId();
		}		
		usuario.setPontuacao(pontuacao);
		pontuacaoRepository.save(pontuacao);
		usuarioRepository.save(usuario);
		if(idRemover != null) {
			this.remover(idRemover);
		}
		return ResponseEntity.ok(new PontuacaoDto(pontuacao));
	}
	
	@CrossOrigin
	@GetMapping("/{id}")
	@Transactional
	public ResponseEntity<PontuacaoDto> detalhar(@PathVariable Long id) {
		Optional<Pontuacao> pontuacao = pontuacaoRepository.findById(id);
		if(pontuacao.isPresent()) {
			return ResponseEntity.ok(new PontuacaoDto(pontuacao.get()));			
		}
		return ResponseEntity.notFound().build();
	}
	
	@CrossOrigin
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> remover(@PathVariable Long id){
		Optional<Pontuacao> pontuacao = pontuacaoRepository.findById(id);
		if(pontuacao.isPresent()) {
			pontuacaoRepository.deleteById(id);	
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
	
}
