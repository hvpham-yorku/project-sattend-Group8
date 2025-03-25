import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class AuthService {
    private static AuthService instance;
    private Map<String, User> users;
    private Map<String, User> usersByID;

    private AuthService() {
        users = new HashMap<>();
        usersByID = new HashMap<>();
        createUser("instructor1", "password123", "John", "Doe", "john.doe@example.com", User.UserRole.INSTRUCTOR);
        createUser("ta1", "password123", "Jane", "Smith", "jane.smith@example.com", User.UserRole.TA);
    }

    public static synchronized AuthService getInstance() {
        if (instance == null) {
            instance = new AuthService();
        }
        return instance;
    }

    public User createUser(String username, String password, String firstName, String lastName,
                           String email, User.UserRole role) {
        if (users.containsKey(username)) {
            throw new IllegalArgumentException("Username already exists");
        }

        User newUser = new User(username, password, firstName, lastName, email, role);
        users.put(username, newUser);
        usersByID.put(newUser.getUserID(), newUser);
        return newUser;
    }

    public Optional<User> authenticateUser(String username, String password) {
        User user = users.get(username);
        if (user != null && user.checkPassword(password)) {
            return Optional.of(user);
        }
        return Optional.empty();
    }

    public Optional<User> getUserByID(String userID) {
        return Optional.ofNullable(usersByID.get(userID));
    }

    public Optional<User> getUserByUsername(String username) {
        return Optional.ofNullable(users.get(username));
    }

    public void assignClassToUser(String userID, String classID) {
        getUserByID(userID).ifPresent(user -> user.assignClass(classID));
    }

    public void unassignClassFromUser(String userID, String classID) {
        getUserByID(userID).ifPresent(user -> user.unassignClass(classID));
    }
    public boolean hasAccessToClass(String userID, String classID) {
        Optional<User> userOpt = getUserByID(userID);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return user.getAssignedClasses().contains(classID);
        }
        return false;
    }
}
