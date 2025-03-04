package com.pedro.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching

@SpringBootApplication
@EnableCaching
class BackendApplication

fun main(args: Array<String>) {
	runApplication<BackendApplication>(*args)
}
