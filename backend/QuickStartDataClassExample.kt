import com.mongodb.client.model.Filters.eq
import com.mongodb.kotlin.client.coroutine.MongoClient
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.runBlocking

// Create data class to represent a MongoDB document
data class Movie(val title: String, val year: Int, val cast: List<String>)

fun main() {

    // Replace the placeholder with your MongoDB deployment's connection string
    val uri = "mongodb+srv://jchang19:qctPf4V3S5vAr25l@sattend.k2qqk.mongodb.net/?retryWrites=true&w=majority&appName=sattend"

    val mongoClient = MongoClient.create(uri)
    val database = mongoClient.getDatabase("sample_mflix")
    // Get a collection of documents of type Movie
    val collection = database.getCollection<Movie>("movies")

    runBlocking {
        val doc = collection.find(eq("title", "Back to the Future")).firstOrNull()
        if (doc != null) {
            println(doc)
        } else {
            println("No matching documents found.")
        }
    }

    mongoClient.close()
}

