package com.pedro.backend.domain.dto

import com.pedro.backend.domain.models.User
import java.io.Serializable

data class UserDto (
    val id: Long,
    val username: String,
    val email: String,
    val role: String
): Serializable {
    companion object {
        fun fromUser(user: User): UserDto {
            return UserDto(id = user.id, username = user.username, email = user.email, role = user.role.toString())
        }
    }
}