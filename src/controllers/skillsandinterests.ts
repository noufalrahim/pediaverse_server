import { Request, Response } from "express";
import { 
    AddSkillsAndInterests, 
    DeleteSkillsAndInterests, 
    GetAllSkillsAndInterests, 
    GetSkillsAndInterestsByStudentId,
    UpdateSkillsAndInterests
} from "../models/SkillsAndInterests";

// ✅ Get all skills and interests
export const getAllSkillsAndInterests = async (req: Request, res: Response) => {
    try {
        const data = await GetAllSkillsAndInterests();
        res.status(200).json(data);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Get skills and interests by student ID
export const getSkillsAndInterestsByStudentId = async (req: Request<{ studentId: string }>, res: Response) => {
    try {
        const { studentId } = req.params;
        if (!studentId) {
            res.status(400).json({ error: "No Student ID provided" });
            return;
        }

        const skills = await GetSkillsAndInterestsByStudentId(studentId);
        res.status(200).json(skills);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Add a new skill or interest
export const addSkillsAndInterests = async (req: Request, res: Response) => {
    try {
        const { studentId, categoryId, skillName, level } = req.body;

        if (!studentId || !categoryId || !skillName) {
            res.status(400).json({ error: "Student ID, Category ID, and Skill Name are required" });
            return;
        }

        const newSkill = await AddSkillsAndInterests({ studentId, categoryId, skillName, level });
        res.status(201).json(newSkill);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Update a skill or interest
export const updateSkillsAndInterests = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const { skillName, level } = req.body;

        if (!id) {
            res.status(400).json({ error: "No Skill ID provided" });
            return;
        }

        if (!skillName && !level) {
            res.status(400).json({ error: "Nothing to update" });
            return;
        }

        const updatedSkill = await UpdateSkillsAndInterests(id, { skillName, level });

        if (!updatedSkill.length) {
            res.status(404).json({ error: "Skill not found" });
            return;
        }

        res.status(200).json(updatedSkill[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Delete a skill or interest by ID
export const deleteSkillsAndInterests = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "No Skill ID provided" });
            return;
        }

        await DeleteSkillsAndInterests(id);
        res.status(200).json({ message: "Skill deleted successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};
