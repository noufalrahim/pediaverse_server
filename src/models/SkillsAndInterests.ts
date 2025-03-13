import { eq } from "drizzle-orm";
import { db } from "../db";
import { NewSkillsAndInterests, skillsAndInterests } from "../db/schema";

// ✅ Get All Skills and Interests
export const GetAllSkillsAndInterests = async () => {
    return await db.select().from(skillsAndInterests);
};

// ✅ Get Skills and Interests by Student ID
export const GetSkillsAndInterestsByStudentId = async (studentId: string) => {
    return await db.select().from(skillsAndInterests).where(eq(skillsAndInterests.studentId, studentId));
};

// ✅ Add a New Skill or Interest
export const AddSkillsAndInterests = async (newSkill: NewSkillsAndInterests) => {
    return await db.insert(skillsAndInterests).values(newSkill).returning();
};

// ✅ Update a Skill or Interest by ID
export const UpdateSkillsAndInterests = async (id: string, updatedFields: Partial<NewSkillsAndInterests>) => {
    return await db
        .update(skillsAndInterests)
        .set(updatedFields)
        .where(eq(skillsAndInterests.id, id))
        .returning();
};

// ✅ Delete a Skill or Interest by ID
export const DeleteSkillsAndInterests = async (id: string) => {
    return await db.delete(skillsAndInterests).where(eq(skillsAndInterests.id, id));
};
