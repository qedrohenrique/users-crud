package com.pedro.backend.domain.dto

import com.pedro.backend.domain.models.LogEntry
import java.io.Serializable
import java.time.LocalDateTime

data class LogDto(
    val id: Long?,
    val method: String,
    val path: String,
    val username: String?,
    val ip: String,
    val body: String,
    val createdAt: LocalDateTime
): Serializable {
    companion object {
        fun fromLogEntry(log: LogEntry): LogDto {
            return LogDto(
                id = log.id,
                method = log.method,
                path = log.path,
                username = log.username,
                ip = log.ip,
                body = log.body,
                createdAt = log.createdAt
            )
        }
    }
}