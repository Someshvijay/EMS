package com.EMS.EMS.service;


import com.EMS.EMS.entity.UserEntity;
import com.EMS.EMS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserEntity login(String email, String rawPassword) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return user; // Successful login
            }
        }
        throw new RuntimeException("Invalid email or password");
    }
}
