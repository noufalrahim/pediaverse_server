import { eq } from "drizzle-orm";
import { db } from "../db";
import { competencies, educations, extracurriculars, observationTimeline, skillsAndInterests, students } from "../db/schema";

export const GetAllStudents = async () => {
    const studentsData = await db.select().from(students);
    return studentsData;
};

export const GetStudentById = async (id: string) => {
    const studentData = await db
        .select()
        .from(students)
        .where(eq(students.id, id));

    if (!studentData.length) return null;

    const education = await db
        .select()
        .from(educations)
        .where(eq(educations.studentId, id));

    const skills = await db
        .select()
        .from(skillsAndInterests)
        .where(eq(skillsAndInterests.studentId, id));

    const extracurricularsData = await db
        .select()
        .from(extracurriculars)
        .where(eq(extracurriculars.studentId, id));

    const competenciesData = await db
        .select()
        .from(competencies)
        .where(eq(competencies.studentId, id));

    const observations = await db
        .select()
        .from(observationTimeline)
        .where(eq(observationTimeline.studentId, id));

    return {
        student: studentData[0],
        education,
        skills,
        extracurricularsData,
        competenciesData,
        observations,
    };
};
