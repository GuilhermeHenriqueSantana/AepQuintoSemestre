package com.unicesumar.API.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unicesumar.API.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	List<Usuario> findByNome(String nome); 
}
