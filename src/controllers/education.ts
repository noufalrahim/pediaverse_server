import { Request, Response } from "express";
import { AddEducation, DeleteEducation, GetAllEducations, GetEducationByStudentId, UpdateEducation } from "../models/Education";

// ✅ Get all education records
export const getAllEducations = async (req: Request, res: Response) => {
    try {
        const educations = await GetAllEducations();
        res.status(200).json(educations);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Get education by Student ID
export const getEducationByStudentId = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const education = await GetEducationByStudentId(id);
        if (!education.length) {
            res.status(404).json({ error: "No education records found for this student" });
            return;
        }
        res.status(200).json(education);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Add a new education record
export const addEducation = async (req: Request, res: Response) => {
    try {
        const { studentId, institute, course, startYear, endYear } = req.body;

        if (!studentId || !institute || !course || !startYear) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        const newEducation = await AddEducation({ studentId, institute, course, startYear, endYear });
        res.status(201).json(newEducation);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Update an education record by ID
export const updateEducation = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedEducation = await UpdateEducation(id, updatedData);
        if (!updatedEducation.length) {
            res.status(404).json({ error: "Education record not found or no changes made" });
            return;
        }
        res.status(200).json(updatedEducation);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Delete an education record by ID
export const deleteEducation = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        await DeleteEducation(id);
        res.status(200).json({ message: "Education record deleted successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};
