import java.util.ArrayList;

public class Main {
	public static void main(String[] args) {
		ArrayList<String> courses = new ArrayList<>();
		courses.add("ABCD123");
		courses.add("EFGH456");
		Student s = new Student("123456789", "Alice", "Avens", courses);
		System.out.println("Created student: " + s);
		System.out.println("Testing AuthService...");
		AuthService authService = AuthService.getInstance();
		System.out.println("Default users created: instructor1 and ta1");
	}
}