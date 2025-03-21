import com.mongodb.client.model.Filters.eq
import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking

data class UserDTO(
    val userID: String,
    val username: String,
    val password: String,
    val firstName: String,
    val lastName: String,
    val email: String,
    val role: String,
    val assignedClasses: List<String>
)

class UserDAO {
    private val uri = System.getenv("MONGODB_URI")
        ?: "mongodb+srv://jchang19:qctPf4V3S5vAr25l@sattend.k2qqk.mongodb.net/?retryWrites=true&w=majority&appName=sattend"

    private val client = MongoClient.create(uri)
    private val database = client.getDatabase("sattend")
    private val collection = database.getCollection<UserDTO>("users")

    // 创建用户
    suspend fun createUser(user: UserDTO): Boolean {
        return try {
            collection.insertOne(user)
            true
        } catch (e: Exception) {
            println("Error creating user: ${e.message}")
            false
        }
    }

    // 根据用户名查找用户
    suspend fun findUserByUsername(username: String): UserDTO? {
        return collection.find(eq("username", username)).firstOrNull()
    }

    // 根据ID查找用户
    suspend fun findUserById(userId: String): UserDTO? {
        return collection.find(eq("userID", userId)).firstOrNull()
    }

    // 更新用户
    suspend fun updateUser(user: UserDTO): Boolean {
        return try {
            val result = collection.replaceOne(eq("userID", user.userID), user)
            result.modifiedCount > 0
        } catch (e: Exception) {
            println("Error updating user: ${e.message}")
            false
        }
    }


    suspend fun assignClassToUser(userId: String, classId: String): Boolean {
        val user = findUserById(userId) ?: return false


        if (!user.assignedClasses.contains(classId)) {
            val updatedUser = user.copy(
                assignedClasses = user.assignedClasses + classId
            )
            return updateUser(updatedUser)
        }
        return true
    }


    suspend fun unassignClassFromUser(userId: String, classId: String): Boolean {
        val user = findUserById(userId) ?: return false

        val updatedUser = user.copy(
            assignedClasses = user.assignedClasses.filter { it != classId }
        )
        return updateUser(updatedUser)
    }


    suspend fun getUsersForClass(classId: String): List<UserDTO> {
        return collection.find(eq("assignedClasses", classId)).toList()
    }


    fun close() {
        client.close()
    }
}
