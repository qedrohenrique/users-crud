package com.pedro.backend.controllers

import com.pedro.backend.dto.UserDto
import com.pedro.backend.models.User
import com.pedro.backend.repositories.UserRepository
import com.pedro.backend.services.UserService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UsersController(
    private val userService: UserService,
) {
    @GetMapping("/users")
    fun getUsers(): List<UserDto> {
        return userService.getAll()
    }
}