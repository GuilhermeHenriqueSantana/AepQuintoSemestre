package com.unicesumar.API.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.unicesumar.API.model.AepUser;
import com.unicesumar.API.repository.AepUserRepository;

@Component
public class CustomUserDetailService implements UserDetailsService{

	private final AepUserRepository aepUserRepository;

	@Autowired
	public CustomUserDetailService(AepUserRepository aepUserRepository) {
		this.aepUserRepository = aepUserRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<AepUser> optionalAepUser =  aepUserRepository.findByUserName(username);
		if (!optionalAepUser.isPresent()) {
			throw new UsernameNotFoundException("Usuario não encontrado");			
		}
		AepUser user = optionalAepUser.get();
		List<GrantedAuthority> authoritiesAdmin = AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN");
		List<GrantedAuthority> authoritiesUser = AuthorityUtils.createAuthorityList("ROLE_USER");
		return new User(user.getNome(), user.getSenha(), user.isAdmin() ? authoritiesAdmin : authoritiesUser);
	}

}
