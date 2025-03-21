import org.litote.kmongo.*
import kotlinx.serialization.Serializable
import org.bson.types.ObjectId

@Serializable
data class User(
    val _id: ObjectId = ObjectId(),
    val email: String,
    val passwordHash: String,
    val role: String
)