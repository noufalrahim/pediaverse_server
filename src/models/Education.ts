import { eq } from "drizzle-orm";
import { db } from "../db";
import { educations } from "../db/schema";

// ✅ Get all education records
export const GetAllEducations = async () => {
    return await db.select().from(educations);
};

// ✅ Get education records by Student ID
export const GetEducationByStudentId = async (studentId: string) => {
    return await db.select().from(educations).where(eq(educations.studentId, studentId));
};

// ✅ Add a new education record
export const AddEducation = async (newEducation: {
    studentId: string;
    institute: string;
    course: string;
    startYear: number;
    endYear?: number;
}) => {
    return await db.insert(educations).values(newEducation).returning();
};

// ✅ Update an education record by ID
export const UpdateEducation = async (id: string, updatedData: Partial<{
    studentId: string;
    institute: string;
    course: string;
    startYear: number;
    endYear?: number;
}>) => {
    return await db.update(educations).set(updatedData).where(eq(educations.id, id)).returning();
};

// ✅ Delete an education record by ID
export const DeleteEducation = async (id: string) => {
    return await db.delete(educations).where(eq(educations.id, id));
};
