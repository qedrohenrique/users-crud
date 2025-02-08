package com.pedro.backend.models

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "logs")
data class LogEntry(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val method: String,
    val path: String,
    val username: String?,
    val ip: String,
    @Column(columnDefinition = "TEXT")
    val body: String,

    @Column(name = "created_at")
    val createdAt: LocalDateTime = LocalDateTime.now()
)
