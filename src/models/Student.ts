import { eq } from "drizzle-orm";
import { db } from "../db";
import { competencies, educations, extracurriculars, observationTimeline, skillsAndInterests, students } from "../db/schema";

export const GetAllStudents = async () => {
    console.log("Hele");
    const studentsData =  await db.select().from(students);
    console.log(studentsData);
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
    const [studentData] = await db.insert(students).values(newStudent).returning();
    return studentData
};

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

export const DeleteStudent = async (id: string) => {
    return await db.delete(students).where(eq(students.id, id));
};
