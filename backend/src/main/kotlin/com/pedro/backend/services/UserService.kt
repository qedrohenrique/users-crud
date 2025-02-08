package com.pedro.backend.services

import com.pedro.backend.common.Role
import com.pedro.backend.dto.RegisterUserDto
import com.pedro.backend.dto.UserDto
import com.pedro.backend.models.User
import com.pedro.backend.repositories.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) {
    fun getAll(): List<UserDto> {
        return userRepository.findAll().map { user -> UserDto.fromUser(user) }
    }

    fun createUser(registerUserDto: RegisterUserDto): UserDto {
        if (userRepository.findByUsername(registerUserDto.username) != null) {
            throw IllegalArgumentException("User already exists.")
        }

        val role = Role.valueOf(registerUserDto.role.uppercase())
        val hashedPassword = passwordEncoder.encode(registerUserDto.password)

        val user = User(email = registerUserDto.email, username = registerUserDto.username, password = hashedPassword, role = role)
        return UserDto.fromUser(userRepository.save(user))
    }

    fun deleteUser(id: String) {
        val user = userRepository.findById(id.toLong()).get()
        userRepository.delete(user)
    }
}