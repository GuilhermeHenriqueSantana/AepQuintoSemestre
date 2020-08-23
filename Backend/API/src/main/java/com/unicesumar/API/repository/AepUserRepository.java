package com.unicesumar.API.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unicesumar.API.model.AepUser;

public interface AepUserRepository extends JpaRepository<AepUser, Long>{

	Optional<AepUser> findByUserName(String userName);
	
}
