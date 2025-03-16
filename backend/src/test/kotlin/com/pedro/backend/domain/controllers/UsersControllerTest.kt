package com.pedro.backend.domain.controllers

import com.pedro.backend.domain.dto.UserDto
import com.pedro.backend.domain.services.UserService
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import java.time.LocalDateTime
import java.util.UUID
import org.assertj.core.api.Assertions.assertThat

@ExtendWith(MockitoExtension::class)
class UsersControllerTest {

    @Mock
    private lateinit var userService: UserService

    @InjectMocks
    private lateinit var usersController: UsersController

    @Test
    fun `should return a page of users`() {
        // Arrange
        val page = 0
        val size = 5
        val userDto1 = UserDto(
            id = 1,
            username = "Test User 1",
            email = "test1@example.com",
            role = "USER"
        )
        val userDto2 = UserDto(
            id = 2,
            username = "Test User 2",
            email = "test2@example.com",
            role = "USER"
        )
        val userDtos = listOf(userDto1, userDto2)
        val userPage = PageImpl(userDtos, PageRequest.of(page, size), userDtos.size.toLong())

        `when`(userService.getAll(page, size)).thenReturn(userPage)

        // Act
        val responseEntity = usersController.getUsers(page, size)

        // Assert
        assertThat(responseEntity.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(responseEntity.body).isNotNull
        assertThat(responseEntity.body?.content).hasSize(2)
        assertThat(responseEntity.body?.content).containsExactlyElementsOf(userDtos)
        assertThat(responseEntity.body?.pageable?.pageNumber).isEqualTo(page)
        assertThat(responseEntity.body?.pageable?.pageSize).isEqualTo(size)
    }
}