package com.pedro.backend.security

import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.jwt.JwtClaimsSet
import org.springframework.stereotype.Service
import org.springframework.security.oauth2.jwt.JwtEncoder
import org.springframework.security.oauth2.jwt.JwtEncoderParameters
import java.time.Instant

@Service
class JwtService(
    private val jwtEncoder: JwtEncoder
) {
    fun generateToken(authentication: Authentication): String {
        val now: Instant = Instant.now()
        val tokenLifetime = 3600L

        val scope = authentication.authorities.stream()
            .map { authority -> SimpleGrantedAuthority(authority.authority).authority }
            .toList()

        val claims: JwtClaimsSet = JwtClaimsSet.builder()
            .issuer("pedro-backend")
            .issuedAt(now)
            .expiresAt(now.plusSeconds(tokenLifetime))
            .subject(authentication.name)
            .claim("scope", scope)
            .build()

        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).tokenValue
    }
}