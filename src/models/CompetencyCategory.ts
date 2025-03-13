import { eq } from "drizzle-orm";
import { db } from "../db";
import { NewCompetencyCategory, competencyCategories } from "../db/schema";

// ✅ Get All Competency Categories
export const GetAllCompetencyCategories = async () => {
    return await db.select().from(competencyCategories);
};

// ✅ Get a Competency Category by ID
export const GetCompetencyCategoryById = async (id: string) => {
    return await db.select().from(competencyCategories).where(eq(competencyCategories.id, id));
};

// ✅ Add a New Competency Category
export const AddCompetencyCategory = async (newCategory: NewCompetencyCategory) => {
    return await db.insert(competencyCategories).values(newCategory).returning();
};

// ✅ Update a Competency Category by ID
export const UpdateCompetencyCategory = async (id: string, updatedData: Partial<NewCompetencyCategory>) => {
    return await db.update(competencyCategories)
        .set(updatedData)
        .where(eq(competencyCategories.id, id))
        .returning();
};

// ✅ Delete a Competency Category by ID
export const DeleteCompetencyCategory = async (id: string) => {
    return await db.delete(competencyCategories).where(eq(competencyCategories.id, id));
};
