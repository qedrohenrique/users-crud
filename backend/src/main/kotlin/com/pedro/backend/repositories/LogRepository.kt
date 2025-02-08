package com.pedro.backend.repositories

import com.pedro.backend.models.LogEntry
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface LogRepository : JpaRepository<LogEntry, Long> {
    override fun findAll(pageable: Pageable): Page<LogEntry>
}
