public class Class{
    private String classID; //should include course code, section, and semester (ex. EECS3311_A_W25)
    private ArrayList <Student> enrollment, <AttendanceRecord> ar;

    public Class(String classID, ArrayList <Student> enrollment){
        this.classID = classID;
        this.enrollment = enrollment;
        ar = new Arraylist<AttendanceRecord>;
    }

    public void addAttendance(AttendanceRecord attendanceRecord){
        ar.add(attendanceRecord);
        System.out.println("Added " + attendanceRecord + " to class " + classID);
    }
}