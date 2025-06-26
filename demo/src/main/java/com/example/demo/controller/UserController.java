package com.example.demo.controller;

import com.example.demo.dto.UserMapping;
import com.example.demo.dto.UserRequestDTO;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }


    @PostMapping("/register")
    public ResponseEntity<Object> createUser(@Valid @RequestBody UserRequestDTO userRequestDTO, Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are already registered!");
        }
        if (userService.existsByUsername(userRequestDTO.username())) {
            return ResponseEntity.badRequest().body("User with this username already exists.");
        }

        User user = UserMapping.toUser(userRequestDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(user);

        return ResponseEntity.created(
                        ServletUriComponentsBuilder.fromCurrentRequest()
                                .path("/{id}")
                                .buildAndExpand(user.getId())
                                .toUri())
                .body(UserMapping.toUserOutDTO(user));
    }


}
