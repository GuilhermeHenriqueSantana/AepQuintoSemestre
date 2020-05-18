package com.unicesumar.API.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
	//return ResponseEntity.ok(new DetalhesTopicoDto(topico.get()));
	
	@GetMapping
	public ResponseEntity<List<UsuarioDto>> lista(String nome){
		List<Usuario> usuarios;
		if(nome == null) {
			usuarios = usuarioRepository.findAll();			
		}else {
			usuarios = usuarioRepository.findByNome(nome);
		}	
		return ResponseEntity.ok(UsuarioDto.converter(usuarios));
	}
	
	@PostMapping
	public ResponseEntity<Usuario> cadastrar(@RequestBody UsuarioForm form){
		System.out.println(form);
		Usuario usuario = form.converter();
		usuarioRepository.save(usuario);
		return ResponseEntity.ok(usuario);
	}
}
