import { Request, Response } from "express";
import { 
    AddSkillsCategory, 
    DeleteSkillsCategory, 
    GetAllSkillsCategories, 
    GetSkillsCategoryById, 
    UpdateSkillsCategory 
} from "../models/SkillsCategory";

// ✅ Get all skills categories
export const getAllSkillsCategories = async (req: Request, res: Response) => {
    try {
        const data = await GetAllSkillsCategories();
        res.status(200).json(data);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Get skills category by ID
export const getSkillsCategoryById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "No Skills Category ID provided" });
            return;
        }

        const category = await GetSkillsCategoryById(id);
        if (!category) {
            res.status(404).json({ error: "Skills Category not found" });
            return;
        }

        res.status(200).json(category);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Add new skills category
export const addSkillsCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.body;

        if (!category) {
            res.status(400).json({ error: "Category is required" });
            return;
        }

        const newCategory = await AddSkillsCategory({ category });
        res.status(201).json(newCategory);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Update skills category by ID
export const updateSkillsCategory = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const { category } = req.body;

        if (!id) {
            res.status(400).json({ error: "No Skills Category ID provided" });
            return;
        }

        if (!category) {
            res.status(400).json({ error: "Category is required for update" });
            return;
        }

        const updatedCategory = await UpdateSkillsCategory(id, { category });
        res.status(200).json(updatedCategory);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Delete skills category by ID
export const deleteSkillsCategory = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "No Skills Category ID provided" });
            return;
        }

        await DeleteSkillsCategory(id);
        res.status(200).json({ message: "Skills Category deleted successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};
