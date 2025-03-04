package com.pedro.backend.services

import com.pedro.backend.dto.LogDto
import com.pedro.backend.models.LogEntry
import com.pedro.backend.repositories.LogRepository
import org.springframework.cache.annotation.CacheEvict
import org.springframework.cache.annotation.Cacheable
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class LogService(private val logRepository: LogRepository) {

    @Cacheable(value = ["logs"], key = "#page + '-' + #size")
    fun getAllLogs(page: Int, size: Int): PageImpl<LogDto> {
        val pageable = PageRequest.of(page, size)
        val logsPage = logRepository.findAll(pageable).map { log -> LogDto.fromLogEntry(log) }
        return PageImpl(
            logsPage.content,
            logsPage.pageable,
            logsPage.totalElements,
        )
    }

    @CacheEvict(value = ["logs"], allEntries = true)
    fun saveLog(method: String, path: String, username: String?, ip: String, body: String) {
        val logEntry = LogEntry(method = method, path = path, username = username, body = body, ip = ip)
        logRepository.save(logEntry)
    }
}
