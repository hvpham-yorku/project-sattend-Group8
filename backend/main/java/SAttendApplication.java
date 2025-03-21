import static spark.Spark.*;

public class SAttendApplication {

    public static void main(String[] args) {

        port(4567);


        enableCORS();

        new UserController();

        get("/api/hello", (req, res) -> {
            res.type("application/json");
            return "{\"message\": \"Hello from SAttend API!\"}";
        });

        System.out.println("SAttend API server started on port 4567");
    }

    private static void enableCORS() {
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
            }

            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
            response.header("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin");
            response.header("Access-Control-Allow-Credentials", "true");
        });
    }
}
