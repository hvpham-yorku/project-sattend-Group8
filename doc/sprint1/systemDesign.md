# System Design Document

## Attendance Marking Feature

#### Class name: `AttendanceRecord`
- Parent Class: None
- Sub Classes: None

Responsibilities:
- A single entry of a `Student`'s attendance status for a particular day in a particular `Class`
- Identify the `Student` for which the record applies by their `studentID`
- Identify the date for which the attendance status is recorded
- Display status as "PRESENT" or "ABSENT"

Collaborators:
- `StudentID` from `Student`
- `status` will be entered into the `attendanceList` for a `Class`

#### Class name: `Class`
- Parent Class: None
- Sub Classes: None

Responsibilities:
- An object to represent a course (class) that `Student`s can enroll in
- Identified by `courseID`, which should include course code, section, and semester (ex. EECS3311_A_W25)
- Holds the list of enrolled students for a particular class and their attendance records
- Update the list of attendance records for a particular class with new entries each time attendance status is marked

Collaborators:
- `Student` for the student list
- `AttendanceRecord` for each attendance record entry

#### Class name: `Student`
- Parent Class: None
- Sub Classes: None

Responsibilities:
- Object for each student which can enroll in a class and have attendance status for each class day
- Identify specific students through their `studentID` and record other relevant information such as first and last name
- Hold the list of `Class`es which the student is enrolled in

Collaborators:
- `Class` for the class enrollment list

### Architecture
- Instructor users interact with a front end UI where a list of students enrolled in a particular class is displayed
- They can click on buttons which set the attendance record as present or absent for a particular student
- On the backend, a new `AttendanceRecord` is created and added to the attendance records for the class