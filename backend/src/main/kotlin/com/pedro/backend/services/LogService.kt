package com.pedro.backend.services

import com.pedro.backend.dto.LogDto
import com.pedro.backend.models.LogEntry
import com.pedro.backend.repositories.LogRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class LogService(private val logRepository: LogRepository) {

    fun getAllLogs(page: Int, size: Int): Page<LogDto> {
        val pageable = PageRequest.of(page, size)
        return logRepository.findAll(pageable).map { log -> LogDto.fromLogEntry(log) }
    }

    fun saveLog(method: String, path: String, username: String?, ip: String, body: String) {
        val logEntry = LogEntry(method = method, path = path, username = username, body = body, ip = ip)
        logRepository.save(logEntry)
    }
}
