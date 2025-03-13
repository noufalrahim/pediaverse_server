import { Request, Response } from "express";
import { 
    AddExtracurricular, 
    DeleteExtracurricular, 
    GetAllExtracurriculars, 
    GetExtracurricularsByStudentId,
    UpdateExtracurricular
} from "../models/Extracurriculars";

// ✅ Get all extracurricular activities
export const getAllExtracurriculars = async (req: Request, res: Response) => {
    try {
        const data = await GetAllExtracurriculars();
        res.status(200).json(data);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Get extracurricular activities by student ID
export const getExtracurricularsByStudentId = async (req: Request<{ studentId: string }>, res: Response) => {
    try {
        const { studentId } = req.params;
        if (!studentId) {
            res.status(400).json({ error: "No Student ID provided" });
            return;
        }

        const activities = await GetExtracurricularsByStudentId(studentId);
        res.status(200).json(activities);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Add a new extracurricular activity
export const addExtracurricular = async (req: Request, res: Response) => {
    try {
        const { studentId, activity } = req.body;

        if (!studentId || !activity) {
            res.status(400).json({ error: "Student ID and Activity are required" });
            return;
        }

        const newActivity = await AddExtracurricular({ studentId, activity });
        res.status(201).json(newActivity);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Update an extracurricular activity
export const updateExtracurricular = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const { activity } = req.body;

        if (!id) {
            res.status(400).json({ error: "No Activity ID provided" });
            return;
        }

        if (!activity) {
            res.status(400).json({ error: "No update data provided" });
            return;
        }

        const updatedActivity = await UpdateExtracurricular(id, { activity });

        if (!updatedActivity.length) {
            res.status(404).json({ error: "Extracurricular activity not found" });
            return;
        }

        res.status(200).json(updatedActivity[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Delete an extracurricular activity by ID
export const deleteExtracurricular = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "No Activity ID provided" });
            return;
        }

        await DeleteExtracurricular(id);
        res.status(200).json({ message: "Activity deleted successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};
