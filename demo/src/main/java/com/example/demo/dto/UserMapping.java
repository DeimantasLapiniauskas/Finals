package com.example.demo.dto;

import com.example.demo.model.User;

import java.util.List;

public class UserMapping {
    public static User toUser(UserRequestDTO userResponseDTO) {
        User user = new User();
        user.setUsername(userResponseDTO.username());
        user.setPassword(userResponseDTO.password());
        user.setRoles(userResponseDTO.roles());
        return user;
    }

    public static List<UserResponseDTO> toUserResponseDTOList(List<User> userList) {
        return userList.stream()
                .map(user -> new UserResponseDTO(
                                user.getUsername()
                        )
                )
                .toList();
    }

    public static UserResponseDTO toUserOutDTO(User user) {
        return new UserResponseDTO(user.getUsername());
    }
}
