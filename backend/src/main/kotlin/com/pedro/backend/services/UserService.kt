package com.pedro.backend.services

import com.pedro.backend.dto.UserDto
import com.pedro.backend.models.User
import com.pedro.backend.repositories.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository
) {
    fun getAll(): List<UserDto> {
        return userRepository.findAll().map { user -> UserDto.fromUser(user) }
    }
}