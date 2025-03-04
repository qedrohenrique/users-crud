package com.pedro.backend.middlewares

import com.pedro.backend.domain.services.LogService
import com.pedro.backend.common.utils.CachedBodyHttpServletRequest
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class LoggingFilter(private val logService: LogService) : OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val wrappedRequest = CachedBodyHttpServletRequest(request)

        val method = wrappedRequest.method
        val path = wrappedRequest.requestURI
        val ip = request.remoteAddr
        val username = SecurityContextHolder.getContext().authentication?.name
        val requestBody = wrappedRequest.getBodyAsString()

        logService.saveLog(method, path, username, ip, requestBody)

        filterChain.doFilter(wrappedRequest, response)    }
}
