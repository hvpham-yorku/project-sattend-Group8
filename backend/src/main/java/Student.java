import java.util.ArrayList;
import java.util.HashSet;

public class Student{
	private String studentID,studentFirstName,studentLastName;
	private HashSet<Class> enrolledClasses; //array of the classIDs for the classes the student is enrolled in

	public Student(String studentID,String studentFirstName,String studentLastName,ArrayList enrolledClasses){
		this.studentID=studentID;
		this.studentFirstName=studentFirstName;
		this.studentLastName=studentLastName;
		this.enrolledClasses = new HashSet<Class>();
	}
}
