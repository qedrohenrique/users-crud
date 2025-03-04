package com.pedro.backend.domain.dto

import com.pedro.backend.common.Role

data class RegisterUserDto (
    val email: String,
    val username: String,
    val password: String,
    val role: String = Role.USER.toString(),
)