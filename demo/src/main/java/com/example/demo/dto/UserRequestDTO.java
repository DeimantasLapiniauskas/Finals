package com.example.demo.dto;

import com.example.demo.model.Role;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UserRequestDTO(@NotNull
                             String username,

                             @NotNull
                             List<Role> roles,

                             @NotNull
                             String password) {
}
