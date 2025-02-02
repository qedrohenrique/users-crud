package com.pedro.backend.services

import org.springframework.stereotype.Service

@Service
class AuthService {
    fun authenticate(): String {
        return "token"
    }
}