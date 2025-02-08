package com.pedro.backend.middlewares

import com.pedro.backend.security.JwtService
import com.pedro.backend.security.JwtUserDetailsService
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.lang.NonNull
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import org.springframework.web.servlet.HandlerExceptionResolver
import java.io.IOException

@Component
class JwtAuthenticationFilter(
    private val jwtService: JwtService,
    private val userDetailsService: JwtUserDetailsService,
    private val handlerExceptionResolver: HandlerExceptionResolver
) : OncePerRequestFilter() {

    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        @NonNull request: HttpServletRequest,
        @NonNull response: HttpServletResponse,
        @NonNull filterChain: FilterChain
    ) {
        val authHeader = request.getHeader("Authorization")

        if (authHeader.isNullOrEmpty() || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response)
            return
        }

        try {
            val jwt = authHeader.substring(7)
            val username = jwtService.extractUsername(jwt)
            val authentication = SecurityContextHolder.getContext().authentication

            if (username != null && authentication == null) {
                val userDetails: UserDetails = userDetailsService.loadUserByUsername(username)

                if (jwtService.isTokenValid(jwt, userDetails)) {
                    val authToken = UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.authorities
                    )
                    authToken.details = WebAuthenticationDetailsSource().buildDetails(request)
                    SecurityContextHolder.getContext().authentication = authToken
                }
            }
            filterChain.doFilter(request, response)
        } catch (exception: Exception) {
            handlerExceptionResolver.resolveException(request, response, null, exception)
        }
    }
}
