package com.pedro.backend.domain.services

import com.pedro.backend.domain.dto.RegisterUserDto
import com.pedro.backend.domain.repositories.UserRepository
import kotlin.test.Test
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import org.flywaydb.core.Flyway
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.BeforeEach
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles

@SpringBootTest
@ActiveProfiles("test")
class UsersServiceTest {

  @Autowired private lateinit var userService: UserService

  @Autowired private lateinit var userRepository: UserRepository

  @Autowired private lateinit var flyway: Flyway

  @BeforeEach
  fun setUp() {
    flyway.clean()
    flyway.migrate()
  }

  @Test
  fun `should create an user`() {
    // Arrange
    val registerUserDto =
            RegisterUserDto(
                    email = "test@test.com",
                    password = "test",
                    username = "test",
                    role = "USER"
            )

    // Act
    userService.createUser(registerUserDto)

    // Assert
    val user = userRepository.findByUsername("test")
    assertNotNull(user)
  }

  @Test
  fun `should delete an user`() {
    // Act
    userService.deleteUser("1")

    // Assert
    val user = userRepository.findById(1)
    assertTrue { user.isEmpty }
  }

  @Test
  fun `should list all users`() {
    // Arrange
    val page = 0
    val size = 10

		// Act
    val users = userService.getAll(page, size)

    // Assert
    assertFalse(users.content.isEmpty())
  }
}
