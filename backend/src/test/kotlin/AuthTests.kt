import io.ktor.application.*
import io.ktor.http.HttpStatusCode
import io.ktor.server.testing.withTestApplication
import io.ktor.features.ContentNegotiation
import io.ktor.features.StatusPages
import io.ktor.jackson.jackson
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import org.junit.Test
import kotlin.test.assertEquals
import com.sattend.database.UserDatabase
import com.sattend.models.User
import com.sattend.authRoutes

class AuthTests {

    @Test
    fun testLoginValidUser() = withTestApplication({
        // Set up the application
        install(ContentNegotiation) { jackson {} }
        routing { authRoutes() }
    }) {
        // Prepare data
        val user = User("test@example.com", "hashedPassword", "teacher")
        UserDatabase.addUser(user)

        // Simulate the login request
        val response = handleRequest(HttpMethod.Post, "/api/login") {
            setBody("""{"email": "test@example.com", "password": "hashedPassword"}""")
            addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
        }

        assertEquals(HttpStatusCode.OK, response.status())
        assert(response.content?.contains("token") == true)
    }

    @Test
    fun testLoginInvalidUser() = withTestApplication({
        // Set up the application
        install(ContentNegotiation) { jackson {} }
        routing { authRoutes() }
    }) {
        // Simulate the login request with invalid credentials
        val response = handleRequest(HttpMethod.Post, "/api/login") {
            setBody("""{"email": "invalid@example.com", "password": "wrongPassword"}""")
            addHeader(HttpHeaders.ContentType, ContentType.Application.Json.toString())
        }

        assertEquals(HttpStatusCode.Unauthorized, response.status())
    }
}