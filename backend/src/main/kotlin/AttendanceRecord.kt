import org.litote.kmongo.*
import kotlinx.serialization.Serializable
import org.bson.types.ObjectId

@Serializable
data class AttendanceRecord(
    val _id: ObjectId = ObjectId(),
    val courseName: String,
    val date: String,
    val studentsPresent: List<String> 
)