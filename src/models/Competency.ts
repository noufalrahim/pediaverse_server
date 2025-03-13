import { eq } from "drizzle-orm";
import { db } from "../db";
import { NewCompetency, competencies } from "../db/schema";

// ✅ Get All Competencies
export const GetAllCompetencies = async () => {
    return await db.select().from(competencies);
};

// ✅ Get Competency by ID
export const GetCompetencyById = async (id: string) => {
    return await db.select().from(competencies).where(eq(competencies.id, id));
};

// ✅ Get Competencies by Student ID
export const GetCompetenciesByStudentId = async (studentId: string) => {
    return await db.select().from(competencies).where(eq(competencies.studentId, studentId));
};

// ✅ Add a New Competency
export const AddCompetency = async (newCompetency: NewCompetency) => {
    return await db.insert(competencies).values(newCompetency).returning();
};

// ✅ Update a Competency by ID
export const UpdateCompetency = async (id: string, updatedData: Partial<NewCompetency>) => {
    return await db
        .update(competencies)
        .set(updatedData)
        .where(eq(competencies.id, id))
        .returning();
};

// ✅ Delete a Competency by ID
export const DeleteCompetency = async (id: string) => {
    return await db.delete(competencies).where(eq(competencies.id, id));
};
