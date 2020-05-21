package com.unicesumar.API.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unicesumar.API.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

}
