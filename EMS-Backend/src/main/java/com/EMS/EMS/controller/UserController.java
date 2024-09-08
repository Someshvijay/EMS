package com.EMS.EMS.controller;

import com.EMS.EMS.entity.UserEntity;
import com.EMS.EMS.entity.PrescriptionEntity;
import com.EMS.EMS.service.UserService;
import com.EMS.EMS.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PrescriptionService prescriptionService;

    @GetMapping
    public ResponseEntity<List<UserEntity>> getUsers() {
        List<UserEntity> users = userService.findAllUserEntities();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable String id) {
        try {
            UserEntity user = userService.findUserEntityById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get a list of prescriptions for a user
    @GetMapping("/{id}/prescriptions")
    public ResponseEntity<List<PrescriptionEntity>> getUserPrescriptions(@PathVariable String id) {
        try {
            List<PrescriptionEntity> prescriptions = prescriptionService.findPrescriptionsByUserId(id);
            return new ResponseEntity<>(prescriptions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<UserEntity> insertUser(@RequestBody UserEntity user) {
        UserEntity createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserEntity> updateUserById(@PathVariable String id, @RequestBody UserEntity updatedUser) {
        try {
            UserEntity user = userService.updateUserById(id, updatedUser);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<UserEntity> updateUserRole(@PathVariable String id, @RequestBody Map<String, String> requestBody) {
        try {
            String newRole = requestBody.get("role");
            UserEntity updatedUser = userService.updateUserRole(id, newRole);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
