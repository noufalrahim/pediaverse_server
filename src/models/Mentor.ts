import { eq } from "drizzle-orm";
import { db } from "../db";
import { NewMentor, mentors } from "../db/schema";

// ✅ Get All Mentors
export const GetAllMentors = async () => {
    return await db.select().from(mentors);
};

// ✅ Get Mentor by ID
export const GetMentorById = async (id: string) => {
    const mentorData = await db.select().from(mentors).where(eq(mentors.id, id));

    return mentorData.length ? mentorData[0] : null;
};

// ✅ Add New Mentor
export const AddMentor = async (newMentor: NewMentor) => {
    return await db.insert(mentors).values(newMentor).returning();
};

// ✅ Update Mentor by ID
export const UpdateMentor = async (id: string, updatedData: Partial<NewMentor>) => {
    return await db.update(mentors).set(updatedData).where(eq(mentors.id, id)).returning();
};

// ✅ Delete Mentor by ID
export const DeleteMentor = async (id: string) => {
    return await db.delete(mentors).where(eq(mentors.id, id));
};
