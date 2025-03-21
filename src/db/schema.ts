import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const students = pgTable("students", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    rollNo: text("roll_no").notNull().unique(),
    course: text("course"),
    age: integer("age").notNull(),
    mail: text("mail").notNull().unique(),
    location: text("location").notNull(),
    phoneNumber: varchar("phone_number").notNull(),
    courseYear: integer("course_year"),
});

export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;

export const mentors = pgTable("mentors", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: text("username").notNull(),
    name: text("name").notNull(),
    password: text("password").notNull(),
    phoneNumber: text("phone_number").notNull(),
});

export type Mentor = typeof mentors.$inferSelect;
export type NewMentor = typeof mentors.$inferInsert;

export const educations = pgTable("educations", {
    id: uuid("id").primaryKey().defaultRandom(),
    studentId: uuid("student_id").notNull().references(() => students.id, {onDelete: 'cascade'}),
    institute: text("institute").notNull(),
    course: text("course").notNull(),
    startYear: integer("start_year").notNull(),
    endYear: integer("end_year"),
});

export type Education = typeof educations.$inferSelect;
export type NewEducation = typeof educations.$inferInsert;

export const skillsCategory = pgTable("skills_category", {
    id: uuid("id").primaryKey().defaultRandom(),
    category: text("category").notNull(),      
});

export type SkillsCategory = typeof skillsCategory.$inferSelect;
export type NewSkillsCategory = typeof skillsCategory.$inferInsert;

export const skillsAndInterests = pgTable("skills_and_interests", {
    id: uuid("id").primaryKey().defaultRandom(),
    studentId: uuid("student_id").notNull().references(() => students.id, { onDelete: 'cascade' }),
    // categoryId: uuid("category_id").notNull().references(() => skillsCategory.id, { onDelete: 'cascade' }),
    categoryId: text("category_id").notNull(),
    skillName: text("skill_name").notNull(),
    level: integer("level"),
});

export type SkillsAndInterests = typeof skillsAndInterests.$inferSelect;
export type NewSkillsAndInterests = typeof skillsAndInterests.$inferInsert;

export const extracurriculars = pgTable("extracurriculars", {
    id: uuid("id").primaryKey().defaultRandom(),
    studentId: uuid("student_id").notNull().references(() => students.id, { onDelete: 'cascade' }),
    activity: text("activity").notNull(),
});

export type Extracurricular = typeof extracurriculars.$inferSelect;
export type NewExtracurricular = typeof extracurriculars.$inferInsert;

export const competencyCategories = pgTable("competency_category", {
    id: uuid("id").primaryKey().defaultRandom(),
    category: text("category").notNull(),      
});

export type CompetencyCategory = typeof competencyCategories.$inferSelect;
export type NewCompetencyCategory = typeof competencyCategories.$inferInsert;

export const competencies = pgTable("competencies", {
    id: uuid("id").primaryKey().defaultRandom(),
    studentId: uuid("student_id").notNull().references(() => students.id, { onDelete: 'cascade' }),
    competencyCategoryId: uuid("competency_category_id").notNull().references(() => competencyCategories.id, {onDelete: 'cascade'}),
    title: text('title').notNull(),
    description: text('description').notNull(),
    level: integer("level"),
});

export type Competency = typeof competencies.$inferSelect;
export type NewCompetency = typeof competencies.$inferInsert;

export const observationTimeline = pgTable("observation_timeline", {
    id: uuid("id").primaryKey().defaultRandom(),
    studentId: uuid("student_id").notNull().references(() => students.id, { onDelete: 'cascade' }),
    mentorId: uuid("mentor_id").notNull().references(() => mentors.id, {onDelete: 'cascade'}),
    title: text('title').notNull(),
    description: text('description').notNull(),
    timestamp: timestamp('timestamp').notNull().defaultNow(),
});

export type ObservationTimeline = typeof observationTimeline.$inferSelect;
export type NewObservationTimeline= typeof observationTimeline.$inferInsert;
