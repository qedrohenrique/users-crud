package com.pedro.backend.domain.repositories

import org.flywaydb.core.Flyway
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.data.domain.PageRequest
import org.springframework.test.context.ActiveProfiles
import kotlin.test.Test
import kotlin.test.assertNull

@SpringBootTest
@ActiveProfiles("test")
class UserRepositoryTest {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    private lateinit var flyway: Flyway

    @BeforeEach
    fun setUp() {
        flyway.clean()
        flyway.migrate()
    }

    @Test
    fun shouldFindAllUsers() {
        // Arrange
        val pageable = PageRequest.of(0, 5)

        // Act
        val usersPage = userRepository.findAll(pageable)

        // Assert
        assertEquals(1, usersPage.content.size)
        assertEquals("admin", usersPage.content.first().username)
    }

    @Test
    fun shouldFindUserByUsername() {
        // Act
        val user = userRepository.findByUsername("admin")

        // Assert
        assertEquals("admin", user?.username)
    }

    @Test
    fun shouldNotFindNonExistentUser() {
        // Act
        val user = userRepository.findByUsername("fake_admin")

        // Assert
        assertNull(user)
    }
}