package com.EMS.EMS.service;

import com.EMS.EMS.entity.UserEntity;
import com.EMS.EMS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserEntity> findAllUserEntities(){
        return userRepository.findAll();
    }

    public UserEntity findUserEntityById(String id) {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public UserEntity createUser(UserEntity user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public UserEntity updateUserById(String id, UserEntity updatedUser) {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            user.setFirstname(updatedUser.getFirstname());
            user.setLastname(updatedUser.getLastname());
            user.setRole(updatedUser.getRole());
            user.setMobilenumber(updatedUser.getMobilenumber());
            user.setEmergencynumber(updatedUser.getEmergencynumber());
            user.setBloodgroup(updatedUser.getBloodgroup());
            user.setGender(updatedUser.getGender());
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

}
