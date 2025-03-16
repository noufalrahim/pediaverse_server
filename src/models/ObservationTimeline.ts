import { eq } from "drizzle-orm";
import { db } from "../db";
import { NewObservationTimeline, observationTimeline } from "../db/schema";

// ✅ Get All Observations
export const GetAllObservations = async () => {
  return await db.select().from(observationTimeline);
};

// ✅ Get Observations by Student ID
export const GetObservationsByStudentId = async (studentId: string) => {
  return await db
    .select()
    .from(observationTimeline)
    .where(eq(observationTimeline.studentId, studentId));
};

// ✅ Get Observations by Mentor ID
export const GetObservationsByMentorId = async (mentorId: string) => {
  return await db
    .select()
    .from(observationTimeline)
    .where(eq(observationTimeline.mentorId, mentorId));
};

// ✅ Add a New Observation
export const AddObservation = async (
  newObservation: NewObservationTimeline
) => {
  return await db
    .insert(observationTimeline)
    .values(newObservation)
    .returning();
};

// ✅ Update an observation by ID
export const UpdateObservation = async (
  id: string,
  updatedData: Partial<NewObservationTimeline>
) => {
  return await db
    .update(observationTimeline)
    .set(updatedData)
    .where(eq(observationTimeline.id, id))
    .returning();
};

// ✅ Delete an Observation by ID
export const DeleteObservation = async (id: string) => {
  return await db
    .delete(observationTimeline)
    .where(eq(observationTimeline.id, id));
};
