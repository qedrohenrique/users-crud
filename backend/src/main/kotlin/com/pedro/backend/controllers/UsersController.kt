package com.pedro.backend.controllers

import com.pedro.backend.dto.RegisterUserDto
import com.pedro.backend.dto.UserDto
import com.pedro.backend.services.UserService
import org.springframework.data.domain.Page
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/users")
class UsersController(
    private val userService: UserService,
) {
    @GetMapping("/list")
    fun getUsers(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int,
    ): ResponseEntity<Page<UserDto>> {
        return ResponseEntity.ok(userService.getAll(page, size))
    }

    @PostMapping("/create")
    fun createUser(@RequestBody registerUserDto: RegisterUserDto): ResponseEntity<UserDto> {
        return ResponseEntity.ok(userService.createUser(registerUserDto))
    }

    @DeleteMapping("/delete/{id}")
    fun deleteUser(@PathVariable id: String): ResponseEntity<String> {
        userService.deleteUser(id)
        return ResponseEntity.ok("Deleted user with id: $id")
    }
}