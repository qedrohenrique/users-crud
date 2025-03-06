package com.pedro.backend.config

import org.springframework.amqp.core.Queue
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
class RabbitMQConfig {
    companion object {
        const val QUEUE_NAME: String = "logs_queue"
    }

    @Bean
    fun logsQueue(): Queue {
        return Queue(QUEUE_NAME, false)
    }
}