package com.pedro.backend.controllers

import com.pedro.backend.services.AuthService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthController(
    private val authService: AuthService
) {

    @PostMapping("/auth")
    fun authenticate(): String {
        return authService.authenticate();
    }

}