import { eq } from "drizzle-orm";
import { db } from "../db";
import { students } from "../db/schema";

// ✅ Get all students
export const GetAllStudents = async () => {
    return await db.select().from(students);
};

// ✅ Get student by ID
export const GetStudentById = async (id: string) => {
    const studentData = await db.select().from(students).where(eq(students.id, id));
    return studentData.length ? studentData[0] : null;
};

// ✅ Add a new student
export const AddStudent = async (newStudent: {
    name: string;
    rollNo: string;
    course: string;
    age: number;
    mail: string;
    location: string;
    phoneNumber: string;
    courseYear: number;
}) => {
    return await db.insert(students).values(newStudent).returning();
};

// ✅ Update student details
export const UpdateStudent = async (id: string, updatedData: Partial<{
    name: string;
    rollNo: string;
    course: string;
    age: number;
    mail: string;
    location: string;
    phoneNumber: string;
    courseYear: number;
}>) => {
    return await db.update(students).set(updatedData).where(eq(students.id, id)).returning();
};

// ✅ Delete a student by ID
export const DeleteStudent = async (id: string) => {
    return await db.delete(students).where(eq(students.id, id));
};
