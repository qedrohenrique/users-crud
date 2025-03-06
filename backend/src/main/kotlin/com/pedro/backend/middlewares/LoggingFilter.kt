package com.pedro.backend.middlewares

import com.fasterxml.jackson.databind.ObjectMapper
import com.pedro.backend.common.utils.CachedBodyHttpServletRequest
import com.pedro.backend.messaging.LogMessageProducer
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class LoggingFilter(
    private val messageProducer: LogMessageProducer,
    private val objectMapper: ObjectMapper
) : OncePerRequestFilter() {
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
        
        val logData = mapOf(
            "method" to method,
            "path" to path,
            "ip" to ip,
            "username" to username,
            "body" to requestBody
        )

        val messageJson = objectMapper.writeValueAsString(logData)

        messageProducer.sendMessage(messageJson)

        filterChain.doFilter(wrappedRequest, response)
    }
}
