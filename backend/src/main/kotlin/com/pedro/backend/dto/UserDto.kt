package com.pedro.backend.dto

import com.pedro.backend.models.User

data class UserDto (
    val id: Long,
    val username: String,
    val email: String,
    val role: String
) {
    companion object {
        fun fromUser(user: User): UserDto {
            return UserDto(id = user.id, username = user.username, email = user.email, role = user.role.toString())
        }
    }
}