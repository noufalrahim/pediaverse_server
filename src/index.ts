//-----------------------Imports-----------------------------

import express from 'express';
import studentsRouter from './routes/student';
import educationRoutes from './routes/education';
import mentorRoutes from "./routes/mentor";
import skillsCategoryRoutes from "./routes/skillscategory";
import skillsAndInterestsRoutes from "./routes/skillsandinterests";
import extracurricularsRoutes from "./routes/extracurriculars";
import competencyCategoryRoutes from "./routes/competencyCategory";
import competencyRoutes from "./routes/competency";
import observationRoutes from "./routes/observationTimeline";

import dotenv from 'dotenv';
import cors from 'cors';

//------------------------Config----------------------------
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
//------------------------Routes--------------------------------
app.use("/api/students", studentsRouter);
app.use("/api/educations", educationRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/skills-category", skillsCategoryRoutes);
app.use("/api/skills-and-interests", skillsAndInterestsRoutes);
app.use("/api/extracurriculars", extracurricularsRoutes);
app.use("/api/competency-categories", competencyCategoryRoutes);
app.use("/api/competencies", competencyRoutes);
app.use("/api/observations", observationRoutes);


app.use('/', (req, res) => {
    res.send("Welcome to pediaverse server!");
});
//------------------------------------------------------------
app.listen(8000, () => {
    console.log("Sever started on PORT 8000");
});