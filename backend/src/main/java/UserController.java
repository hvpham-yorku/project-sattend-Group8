import com.fasterxml.jackson.databind.ObjectMapper;
import spark.Request;
import spark.Response;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static spark.Spark.*;

public class UserController {
    private AuthService authService;
    private ObjectMapper objectMapper;

    public UserController() {
        this.authService = AuthService.getInstance();
        this.objectMapper = new ObjectMapper();

        // 设置路由
        setupRoutes();
    }

    private void setupRoutes() {
        // 设置JSON内容类型
        before((request, response) -> response.type("application/json"));

        // 用户注册
        post("/api/register", this::registerUser);

        // 用户登录
        post("/api/login", this::loginUser);

        // 获取用户信息
        get("/api/users/:id", this::getUserInfo);

        // 为用户分配课程
        post("/api/users/:id/classes", this::assignClassToUser);

        // 从用户中移除课程
        delete("/api/users/:id/classes/:classId", this::unassignClassFromUser);
    }

    public String registerUser(Request request, Response response) {
        try {
            Map<String, Object> requestBody = objectMapper.readValue(request.body(), Map.class);

            String username = (String) requestBody.get("username");
            String password = (String) requestBody.get("password");
            String firstName = (String) requestBody.get("firstName");
            String lastName = (String) requestBody.get("lastName");
            String email = (String) requestBody.get("email");
            String roleStr = (String) requestBody.get("role");

            User.UserRole role = User.UserRole.valueOf(roleStr.toUpperCase());

            User user = authService.createUser(username, password, firstName, lastName, email, role);

            response.status(201); // 201 Created
            return objectMapper.writeValueAsString(toUserResponse(user));

        } catch (IllegalArgumentException e) {
            response.status(400); // 400 Bad Request
            return createErrorResponse(e.getMessage());

        } catch (Exception e) {
            response.status(500); // 500 Internal Server Error
            return createErrorResponse("注册用户时发生错误");
        }
    }

    public String loginUser(Request request, Response response) {
        try {
            Map<String, Object> requestBody = objectMapper.readValue(request.body(), Map.class);

            String username = (String) requestBody.get("username");
            String password = (String) requestBody.get("password");

            Optional<User> userOpt = authService.authenticateUser(username, password);

            if (userOpt.isPresent()) {
                User user = userOpt.get();
                response.status(200); // 200 OK
                return objectMapper.writeValueAsString(toUserResponse(user));
            } else {
                response.status(401); // 401 Unauthorized
                return createErrorResponse("用户名或密码无效");
            }

        } catch (Exception e) {
            response.status(500); // 500 Internal Server Error
            return createErrorResponse("登录时发生错误");
        }
    }

    public String getUserInfo(Request request, Response response) {
        try {
            String userId = request.params(":id");

            Optional<User> userOpt = authService.getUserByID(userId);

            if (userOpt.isPresent()) {
                User user = userOpt.get();
                response.status(200); // 200 OK
                return objectMapper.writeValueAsString(toUserResponse(user));
            } else {
                response.status(404); // 404 Not Found
                return createErrorResponse("用户未找到");
            }

        } catch (Exception e) {
            response.status(500); // 500 Internal Server Error
            return createErrorResponse("获取用户信息时发生错误");
        }
    }

    public String assignClassToUser(Request request, Response response) {
        try {
            String userId = request.params(":id");
            Map<String, Object> requestBody = objectMapper.readValue(request.body(), Map.class);

            String classId = (String) requestBody.get("classId");

            authService.assignClassToUser(userId, classId);

            response.status(200); // 200 OK
            return createSuccessResponse("课程分配成功");

        } catch (Exception e) {
            response.status(500); // 500 Internal Server Error
            return createErrorResponse("为用户分配课程时发生错误");
        }
    }

    public String unassignClassFromUser(Request request, Response response) {
        try {
            String userId = request.params(":id");
            String classId = request.params(":classId");

            authService.unassignClassFromUser(userId, classId);

            response.status(200); // 200 OK
            return createSuccessResponse("课程取消分配成功");

        } catch (Exception e) {
            response.status(500); // 500 Internal Server Error
            return createErrorResponse("从用户取消分配课程时发生错误");
        }
    }

    private Map<String, Object> toUserResponse(User user) {
        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("id", user.getUserID());
        userResponse.put("username", user.getUsername());
        userResponse.put("firstName", user.getFirstName());
        userResponse.put("lastName", user.getLastName());
        userResponse.put("email", user.getEmail());
        userResponse.put("role", user.getRole().toString());
        userResponse.put("assignedClasses", user.getAssignedClasses());
        return userResponse;
    }

    private String createErrorResponse(String message) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("error", message);
        try {
            return objectMapper.writeValueAsString(errorResponse);
        } catch (Exception e) {
            return "{\"error\": \"发生意外错误\"}";
        }
    }
private String registerUser(Request request, Response response) {
    try {
        Map<String, Object> requestBody = objectMapper.readValue(request.body(), Map.class);
        
        String username = (String) requestBody.get("username");
        String password = (String) requestBody.get("password");
        String firstName = (String) requestBody.get("firstName");
        String lastName = (String) requestBody.get("lastName");
        String email = (String) requestBody.get("email");
        String roleStr = (String) requestBody.get("role");
        
        User.UserRole role = User.UserRole.valueOf(roleStr.toUpperCase());
        
        User user = authService.createUser(username, password, firstName, lastName, email, role);
        
        response.status(201); // 201 Created
        return objectMapper.writeValueAsString(toUserResponse(user));
        
    } catch (IllegalArgumentException e) {
        response.status(400); // 400 Bad Request
        return createErrorResponse(e.getMessage());
        
    } catch (Exception e) {
        response.status(500); // 500 Internal Server Error
        return createErrorResponse("An error occurred while registering the user");
    }
}
    private String createSuccessResponse(String message) {
        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("message", message);
        try {
            return objectMapper.writeValueAsString(successResponse);
        } catch (Exception e) {
            return "{\"message\": \"操作成功完成\"}";
        }
    }
}