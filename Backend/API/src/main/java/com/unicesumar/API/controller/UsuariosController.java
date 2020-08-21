package com.unicesumar.API.controller;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

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

import com.unicesumar.API.controller.dto.UsuarioDto;
import com.unicesumar.API.controller.form.UsuarioForm;
import com.unicesumar.API.model.Usuario;
import com.unicesumar.API.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
public class UsuariosController {

	@Autowired
	UsuarioRepository usuarioRepository;
	
	@CrossOrigin
	@GetMapping
	@Transactional
	public ResponseEntity<List<UsuarioDto>> lista(){
		List<Usuario> usuarios = usuarioRepository.findAll();	
		return ResponseEntity.ok(UsuarioDto.converter(usuarios));
	}
	
	@CrossOrigin
	@PostMapping
	@Transactional
	public ResponseEntity<UsuarioDto> cadastrar(@RequestBody @Valid UsuarioForm form){
		Usuario usuario = form.converter();
		Optional<Usuario> usuarioOptional = usuarioRepository.buscarPeloNome(usuario.getNome());
		if(usuarioOptional.isPresent()) {
			usuario = usuarioOptional.get();
		}else {
			usuarioRepository.save(usuario);			
		}
		return ResponseEntity.ok(new UsuarioDto(usuario));
	}
	
	@CrossOrigin
	@GetMapping("/{id}")
	@Transactional
	public ResponseEntity<UsuarioDto> detalhar(@PathVariable Long id) {
		Optional<Usuario> usuario = usuarioRepository.findById(id);
		if(usuario.isPresent()) {
			return ResponseEntity.ok(new UsuarioDto(usuario.get()));			
		}
		return ResponseEntity.notFound().build();
	}
	
	@CrossOrigin
	@DeleteMapping("/{id}")
	@Transactional
	public ResponseEntity<?> remover(@PathVariable Long id){
		Optional<Usuario> usuario = usuarioRepository.findById(id);
		if(usuario.isPresent()) {
			usuarioRepository.deleteById(id);	
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
}
