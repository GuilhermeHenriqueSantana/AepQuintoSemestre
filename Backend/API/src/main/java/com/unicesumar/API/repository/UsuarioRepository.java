package com.unicesumar.API.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.unicesumar.API.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	@Query("select u from Usuario u where u.nome = :nome")
	Optional<Usuario> buscarPeloNome(@Param("nome") String nome);
}
