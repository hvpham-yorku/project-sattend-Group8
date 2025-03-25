import java.util.ArrayList;
import java.util.UUID;

public class User {
    private String userID;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;

    public enum UserRole {
        INSTRUCTOR,
        TA,
        ADMIN
    }

    private UserRole role;
    private ArrayList<String> assignedClasses;

    public User(String username, String password, String firstName, String lastName,
                String email, UserRole role) {
        this.userID = UUID.randomUUID().toString();
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.assignedClasses = new ArrayList<>();
    }

    // Getters and setters
    public String getUserID() {
        return userID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean checkPassword(String inputPassword) {
        return this.password.equals(inputPassword);
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public ArrayList<String> getAssignedClasses() {
        return assignedClasses;
    }

    public void assignClass(String classID) {
        if (!assignedClasses.contains(classID)) {
            assignedClasses.add(classID);
        }
    }

    public void unassignClass(String classID) {
        assignedClasses.remove(classID);
    }

    @Override
    public String toString() {
        return "User{" +
                "userID='" + userID + '\'' +
                ", username='" + username + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                ", assignedClasses=" + assignedClasses +
                '}';
    }
}
