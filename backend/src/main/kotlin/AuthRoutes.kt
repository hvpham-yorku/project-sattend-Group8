import io.ktor.application.*
import io.ktor.features.ContentNegotiation
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.post
import io.ktor.routing.Route
import io.ktor.features.StatusPages
import io.ktor.http.HttpStatusCode
import com.sattend.database.UserDatabase
import com.sattend.models.User
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import kotlinx.serialization.Serializable
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.ktor.features.ContentNegotiation
import io.ktor.jackson.jackson

data class LoginRequest(val email: String, val password: String)

fun Route.authRoutes() {
    post("/api/login") {
        val loginRequest = call.receive<LoginRequest>()
        val user = UserDatabase.getUserByEmail(loginRequest.email)

        if (user != null && user.passwordHash == loginRequest.password) {
            val token = JWT.create()
                .withSubject(user.email)
                .sign(Algorithm.HMAC256("secret"))
            
            call.respond(HttpStatusCode.OK, mapOf("token" to token))
        } else {
            call.respond(HttpStatusCode.Unauthorized, "Invalid email or password")
        }
    }
}