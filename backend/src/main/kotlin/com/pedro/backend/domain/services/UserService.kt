package com.pedro.backend.domain.services

import com.pedro.backend.common.Role
import com.pedro.backend.domain.dto.RegisterUserDto
import com.pedro.backend.domain.dto.UserDto
import com.pedro.backend.domain.models.User
import com.pedro.backend.domain.repositories.UserRepository
import org.springframework.cache.annotation.CacheEvict
import org.springframework.cache.annotation.Cacheable
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) {
    @Cacheable(value = ["users"], key = "#page + '-' + #size")
    fun getAll(page: Int, size: Int): PageImpl<UserDto> {
        val pageable = PageRequest.of(page, size)
        val usersPage = userRepository.findAll(pageable).map { user -> UserDto.fromUser(user) }
        return PageImpl(
            usersPage.content,
            usersPage.pageable,
            usersPage.totalElements,
        )
    }

    @CacheEvict(value = ["users"], allEntries = true)
    fun createUser(registerUserDto: RegisterUserDto): UserDto {
        if (userRepository.findByUsername(registerUserDto.username) != null) {
            throw IllegalArgumentException("User already exists.")
        }

        val role = Role.valueOf(registerUserDto.role.uppercase())
        val hashedPassword = passwordEncoder.encode(registerUserDto.password)

        val user = User(email = registerUserDto.email, username = registerUserDto.username, password = hashedPassword, role = role)
        return UserDto.fromUser(userRepository.save(user))
    }

    @CacheEvict(value = ["users"], allEntries = true)
    fun deleteUser(id: String) {
        val user = userRepository.findById(id.toLong()).get()
        userRepository.delete(user)
    }
}