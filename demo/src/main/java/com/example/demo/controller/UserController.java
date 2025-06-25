package com.example.demo.controller;

import com.example.demo.dto.UserMapping;
import com.example.demo.dto.UserRequestDTO;
import com.example.demo.dto.UserResponseDTO;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(UserMapping.toUserResponseDTOList(userService.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {

        Optional<User> user = userService.findById(id);
        return user
                .map(value -> ResponseEntity.ok(UserMapping.toUserOutDTO(value)))
                .orElseGet(() -> ResponseEntity.notFound().build()
                );
    }

    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody UserRequestDTO userRequestDTO) {

        if (userService.existsByUsername(userRequestDTO.username())) {
            return ResponseEntity.badRequest().body("User with this username already exists.");
        }

        User user = UserMapping.toUser(userRequestDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(UserMapping.toUserOutDTO(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updatePassword(@PathVariable Long id, @RequestBody String password) {
        Optional<User> user = userService.findById(id);
        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        user.get().setPassword(passwordEncoder.encode(password));
        userService.save(user.get());

        return ResponseEntity.ok(UserMapping.toUserOutDTO(user.get()));
    }


}
