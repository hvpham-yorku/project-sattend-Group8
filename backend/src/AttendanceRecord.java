import java.sql.Date;

public class AttendanceRecord {
    private String studentID;
    private Date date;
    enum attendance {
        PRESENT,
        ABSENT
    }
    attendance status;

    public AttendanceRecord(String studentID, Date date, attendance status){
        this.studentID = studentID;
        this.date = date;
        this.status = status;
    }
}