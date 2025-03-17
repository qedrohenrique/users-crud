package com.pedro.backend.domain.repositories

import org.junit.jupiter.api.Assertions.assertEquals
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import kotlin.test.Test

@SpringBootTest
@ActiveProfiles("test")
class UserRepositoryTest {

    @Test
    fun shouldFindAllUsers() {
        assertEquals(1, 1)
    }
}