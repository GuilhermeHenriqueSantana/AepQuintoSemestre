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

import com.unicesumar.API.controller.dto.AlternativaDto;
import com.unicesumar.API.controller.form.AlternativaForm;
import com.unicesumar.API.model.Alternativa;
import com.unicesumar.API.repository.AlternativaRepository;

@RestController
@RequestMapping("/alternativa")
public class AlternativaController {
	
	@Autowired
	AlternativaRepository alternativaRepository;
	
	@CrossOrigin
	@GetMapping
	@Transactional
	public ResponseEntity<List<AlternativaDto>> lista(){
		List<Alternativa> alternativas = alternativaRepository.findAll();	
		return ResponseEntity.ok(AlternativaDto.converter(alternativas));
	}
	
	@CrossOrigin
	@PostMapping
	@Transactional
	public ResponseEntity<AlternativaDto> cadastrar(@RequestBody AlternativaForm form){
		Alternativa alternativa = form.converter();
		alternativaRepository.save(alternativa);
		return ResponseEntity.ok(new AlternativaDto(alternativa));
	}
	
	@CrossOrigin
	@GetMapping("/{id}")
	@Transactional
	public ResponseEntity<AlternativaDto> detalhar(@PathVariable Long id){
		Optional<Alternativa> alternativa = alternativaRepository.findById(id);
		System.out.println(alternativa.get());
		if(alternativa.isPresent()) {
			return ResponseEntity.ok(new AlternativaDto(alternativa.get()));			
		}
		return ResponseEntity.notFound().build();
	}
	
	@CrossOrigin
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> remover(@PathVariable Long id){
		Optional<Alternativa> alternativa = alternativaRepository.findById(id);
		if(alternativa.isPresent()) {
			alternativaRepository.deleteById(id);	
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

}
