package com.unicesumar.API.config.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PassowordEncoder {
	public static void main(String[] args) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		System.out.println(passwordEncoder.encode("123456"));
	}
}
