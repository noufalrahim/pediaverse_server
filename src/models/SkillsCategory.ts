import { eq } from "drizzle-orm";
import { db } from "../db";
import { NewSkillsCategory, skillsCategory } from "../db/schema";

// ✅ Get All Skills Categories
export const GetAllSkillsCategories = async () => {
    return await db.select().from(skillsCategory);
};

// ✅ Get Skills Category by ID
export const GetSkillsCategoryById = async (id: string) => {
    const categoryData = await db.select().from(skillsCategory).where(eq(skillsCategory.id, id));
    return categoryData.length ? categoryData[0] : null;
};

// ✅ Add New Skills Category
export const AddSkillsCategory = async (newCategory: NewSkillsCategory) => {
    return await db.insert(skillsCategory).values(newCategory).returning();
};

// ✅ Update Skills Category by ID
export const UpdateSkillsCategory = async (id: string, updatedCategory: Partial<NewSkillsCategory>) => {
    return await db.update(skillsCategory).set(updatedCategory).where(eq(skillsCategory.id, id)).returning();
};

// ✅ Delete Skills Category by ID
export const DeleteSkillsCategory = async (id: string) => {
    return await db.delete(skillsCategory).where(eq(skillsCategory.id, id));
};
