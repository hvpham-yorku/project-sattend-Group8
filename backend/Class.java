import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

public class Class {
    private String classID; // should include course code, section, and semester (ex. EECS3311_A_W25)
    private ArrayList<Student> enrollment;
    private ArrayList<AttendanceRecord> attendanceRecords;
    private Set<String> authorizedUsers; // 存储有权限访问此课程的用户ID

    public Class(String classID, ArrayList<Student> enrollment) {
        this.classID = classID;
        this.enrollment = enrollment;
        this.attendanceRecords = new ArrayList<>();
        this.authorizedUsers = new HashSet<>();
    }

    public String getClassID() {
        return classID;
    }

    public ArrayList<Student> getEnrollment() {
        return enrollment;
    }

    public void addStudent(Student student) {
        enrollment.add(student);
    }

    public void removeStudent(Student student) {
        enrollment.remove(student);
    }

    public void addAttendanceRecord(AttendanceRecord attendanceRecord) {
        attendanceRecords.add(attendanceRecord);
        System.out.println("Added " + attendanceRecord + " to class " + classID);
    }

    public ArrayList<AttendanceRecord> getAttendanceRecords() {
        return attendanceRecords;
    }

    // 授权用户访问此课程
    public void authorizeUser(String userID) {
        authorizedUsers.add(userID);
    }

    // 撤销用户访问此课程的权限
    public void deauthorizeUser(String userID) {
        authorizedUsers.remove(userID);
    }

    // 检查用户是否有权限访问此课程
    public boolean isUserAuthorized(String userID) {
        return authorizedUsers.contains(userID);
    }

    @Override
    public String toString() {
        return "Class{" +
                "classID='" + classID + '\'' +
                ", enrollment size=" + enrollment.size() +
                ", attendance records=" + attendanceRecords.size() +
                '}';
    }
}