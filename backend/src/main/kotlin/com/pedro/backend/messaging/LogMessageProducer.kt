package com.pedro.backend.messaging

import com.pedro.backend.config.RabbitMQConfig
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.stereotype.Service

@Service
class LogMessageProducer(private val rabbitTemplate: RabbitTemplate) {
    fun sendMessage(message: String?) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.QUEUE_NAME, message!!)
    }
}