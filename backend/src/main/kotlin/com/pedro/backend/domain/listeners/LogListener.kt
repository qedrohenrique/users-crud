package com.pedro.backend.domain.listeners

import com.fasterxml.jackson.databind.ObjectMapper
import com.pedro.backend.domain.models.LogEntry
import com.pedro.backend.domain.services.LogService
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.context.annotation.Configuration

@Configuration
class LogListener (
    private val objectMapper: ObjectMapper,
    private val logService: LogService
) {
    @RabbitListener(queues = ["logs_queue"])
    fun listen(message: String) {
        val logData = objectMapper.readValue(message, LogEntry::class.java)

        logService.saveLog(
            method = logData.method,
            path = logData.path,
            username = logData.username,
            ip = logData.ip,
            body = logData.body.replace("\\s+".toRegex(), "")
        )
    }
}