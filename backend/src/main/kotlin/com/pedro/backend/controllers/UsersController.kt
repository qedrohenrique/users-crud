package com.pedro.backend.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UsersController {

    @GetMapping("/")
    fun index(): String {
        return "Hello, world!"
    }

}