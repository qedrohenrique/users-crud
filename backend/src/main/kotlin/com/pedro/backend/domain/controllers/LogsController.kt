package com.pedro.backend.domain.controllers

import com.pedro.backend.domain.dto.LogDto
import com.pedro.backend.domain.services.LogService
import org.springframework.data.domain.Page
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/logs")
class LogsController(
    private val logService: LogService
){
    @GetMapping("/list")
    fun getLogs(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int,
    ): ResponseEntity<Page<LogDto>> {
        return ResponseEntity.ok(logService.getAllLogs(page, size))
    }
}