package com.pedro.backend.utils

import jakarta.servlet.ReadListener
import jakarta.servlet.ServletInputStream
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletRequestWrapper
import java.io.*

class CachedBodyHttpServletRequest(request: HttpServletRequest) : HttpServletRequestWrapper(request) {

    private val cachedBody: ByteArray

    init {
        val inputStream = request.inputStream
        cachedBody = inputStream.readBytes()
    }

    override fun getInputStream(): ServletInputStream {
        val byteArrayInputStream = ByteArrayInputStream(cachedBody)

        return object : ServletInputStream() {
            override fun read(): Int = byteArrayInputStream.read()
            override fun isFinished(): Boolean = byteArrayInputStream.available() == 0
            override fun isReady(): Boolean = true
            override fun setReadListener(listener: ReadListener?) {}
        }
    }

    fun getBodyAsString(): String = String(cachedBody, Charsets.UTF_8)
}
