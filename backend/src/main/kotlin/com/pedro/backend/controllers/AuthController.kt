package com.pedro.backend.controllers

import com.pedro.backend.security.JwtService
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthController(
    private val authenticationManager: AuthenticationManager,
    private val jwtService: JwtService
) {
    @PostMapping("/auth")
    fun authenticate(@RequestBody request: AuthenticationRequest): ResponseEntity<String> {
        val authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(request.username, request.password)
        )
        val jwt = jwtService.generateToken(authentication)
        return ResponseEntity.ok(jwt)
    }
}

data class AuthenticationRequest(
    val username: String,
    val password: String
)