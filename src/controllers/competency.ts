import { Request, Response } from "express";
import { 
    AddCompetency, 
    DeleteCompetency, 
    GetAllCompetencies, 
    GetCompetencyById, 
    GetCompetenciesByStudentId, 
    UpdateCompetency
} from "../models/Competency";

// ✅ Get all competencies
export const getAllCompetencies = async (req: Request, res: Response) => {
    try {
        const data = await GetAllCompetencies();
        res.status(200).json(data);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Get a competency by ID
export const getCompetencyById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "No ID provided" });
            return;
        }

        const competency = await GetCompetencyById(id);
        res.status(200).json(competency);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Get all competencies for a specific student
export const getCompetenciesByStudentId = async (req: Request<{ studentId: string }>, res: Response) => {
    try {
        const { studentId } = req.params;
        if (!studentId) {
            res.status(400).json({ error: "No student ID provided" });
            return;
        }

        const competencies = await GetCompetenciesByStudentId(studentId);
        res.status(200).json(competencies);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Add a new competency
export const addCompetency = async (req: Request, res: Response) => {
    try {
        const { studentId, competencyCategoryId, title, description, level } = req.body;

        if (!studentId || !competencyCategoryId || !title || !description) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        const newCompetency = await AddCompetency({ studentId, competencyCategoryId, title, description, level });
        res.status(201).json(newCompetency);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Update a competency
export const updateCompetency = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, level } = req.body;

        if (!id) {
            res.status(400).json({ error: "No ID provided" });
            return;
        }

        const updatedData: Partial<{ title: string; description: string; level: number }> = {};
        if (title) updatedData.title = title;
        if (description) updatedData.description = description;
        if (level !== undefined) updatedData.level = level;

        const updatedCompetency = await UpdateCompetency(id, updatedData);

        if (!updatedCompetency.length) {
            res.status(404).json({ error: "Competency not found" });
            return;
        }

        res.status(200).json(updatedCompetency[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Delete a competency by ID
export const deleteCompetency = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "No ID provided" });
            return;
        }

        await DeleteCompetency(id);
        res.status(200).json({ message: "Competency deleted successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};
