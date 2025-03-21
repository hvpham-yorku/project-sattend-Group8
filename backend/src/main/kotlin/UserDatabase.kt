import org.litote.kmongo.*
import com.mongodb.client.MongoDatabase
import com.mongodb.client.MongoCollection
import com.sattend.models.User
import com.sattend.models.AttendanceRecord
import org.bson.types.ObjectId

object UserDatabase {
    private val client = KMongo.createClient()
    private val database: MongoDatabase = client.getDatabase("sattendDB")
    private val users: MongoCollection<User> = database.getCollection()
    private val attendanceRecords: MongoCollection<AttendanceRecord> = database.getCollection()

    fun addUser(user: User) {
        users.insertOne(user)
    }

    fun getUserByEmail(email: String): User? {
        return users.findOne(User::email eq email)
    }

    fun assignAttendanceRecord(userEmail: String, record: AttendanceRecord) {
        val user = getUserByEmail(userEmail)
        if (user != null) {
            attendanceRecords.insertOne(record)
        }
    }
}