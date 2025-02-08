package com.pedro.backend.security

import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.security.oauth2.jwt.JwtEncoder
import org.springframework.security.oauth2.jwt.JwtEncoderParameters
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.jwt.JwtClaimsSet
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class JwtService(
    private val jwtEncoder: JwtEncoder,
    private val jwtDecoder: JwtDecoder
) {

    fun generateToken(authentication: Authentication): String {
        val now: Instant = Instant.now()
        val tokenLifetime = 3600L

        val role = authentication.authorities.first().authority

        val claims: JwtClaimsSet = JwtClaimsSet.builder()
            .issuer("pedro-backend")
            .issuedAt(now)
            .expiresAt(now.plusSeconds(tokenLifetime))
            .subject(authentication.name)
            .claim("role", role)
            .build()

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).tokenValue
    }

    fun extractUsername(token: String): String? {
        return try {
            val jwt: Jwt = jwtDecoder.decode(token)
            jwt.subject
        } catch (e: Exception) {
            null
        }
    }

    fun isTokenValid(token: String, userDetails: UserDetails): Boolean {
        val username = extractUsername(token)
        return username != null && username == userDetails.username && !isTokenExpired(token)
    }

    private fun isTokenExpired(token: String): Boolean {
        return try {
            val jwt: Jwt = jwtDecoder.decode(token)
            jwt.expiresAt?.isBefore(Instant.now()) ?: true
        } catch (e: Exception) {
            true
        }
    }
}
