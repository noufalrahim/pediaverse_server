import { eq } from "drizzle-orm";
import { db } from "../db";
import { NewExtracurricular,extracurriculars } from "../db/schema";

// ✅ Get All Extracurricular Activities
export const GetAllExtracurriculars = async () => {
    return await db.select().from(extracurriculars);
};

// ✅ Get Extracurricular Activities by Student ID
export const GetExtracurricularsByStudentId = async (studentId: string) => {
    return await db.select().from(extracurriculars).where(eq(extracurriculars.studentId, studentId));
};

// ✅ Add a New Extracurricular Activity
export const AddExtracurricular = async (newExtracurricular: NewExtracurricular) => {
    return await db.insert(extracurriculars).values(newExtracurricular).returning();
};

// ✅ Update an Extracurricular Activity
export const UpdateExtracurricular = async (id: string, updatedData: Partial<{ activity: string }>) => {
    return await db.update(extracurriculars)
        .set(updatedData)
        .where(eq(extracurriculars.id, id))
        .returning();
};

// ✅ Delete an Extracurricular Activity by ID
export const DeleteExtracurricular = async (id: string) => {
    return await db.delete(extracurriculars).where(eq(extracurriculars.id, id));
};
