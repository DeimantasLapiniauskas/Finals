package com.example.demo.dto;

import com.example.demo.model.Role;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record MechanicRequestDTO(@NotNull
                                 String fullName,

                                 @NotNull
                                 double experienceYears) {
}
