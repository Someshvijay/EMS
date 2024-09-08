package com.EMS.EMS.service;

import com.EMS.EMS.entity.UserEntity;
import com.EMS.EMS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    public List<UserEntity> findAllUserEntities() {
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

    public UserEntity createUser(UserEntity user) {
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

    public void processForgotPassword(String email) {
        Optional<UserEntity> userOptional = userRepository.findByEmail(email);
        if (!userOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email not found");
        }

        UserEntity user = userOptional.get();
        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setTokenExpiryDate(LocalDateTime.now().plusHours(1)); // 1-hour expiry time
        userRepository.save(user);

        sendResetEmail(user.getEmail(), token);
    }

    private void sendResetEmail(String email, String token) {
        String url = "http://localhost:5173/reset-password?token=" + token;  // Frontend reset password URL

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("Password Reset Request");
        mailMessage.setText("To reset your password, click the link below:\n" + url);

        mailSender.send(mailMessage);
    }

    public void resetPassword(String token, String newPassword) {
        Optional<UserEntity> userOptional = userRepository.findByResetToken(token);
        if (!userOptional.isPresent() || userOptional.get().getTokenExpiryDate().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid or expired token.");
        }

        UserEntity user = userOptional.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);  // Clear the reset token after successful password reset
        user.setTokenExpiryDate(null);
        userRepository.save(user);
    }

    public UserEntity updateUserRole(String id, String newRole) {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            user.setRole(newRole); // Update the role
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
