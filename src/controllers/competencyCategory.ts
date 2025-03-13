import { Request, Response } from "express";
import { 
    AddCompetencyCategory, 
    DeleteCompetencyCategory, 
    GetAllCompetencyCategories, 
    GetCompetencyCategoryById,
    UpdateCompetencyCategory
} from "../models/CompetencyCategory";

// ✅ Get all competency categories
export const getAllCompetencyCategories = async (req: Request, res: Response) => {
    try {
        const data = await GetAllCompetencyCategories();
        res.status(200).json(data);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Get a competency category by ID
export const getCompetencyCategoryById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "No ID provided" });
            return;
        }

        const category = await GetCompetencyCategoryById(id);
        res.status(200).json(category);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Add a new competency category
export const addCompetencyCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.body;

        if (!category) {
            res.status(400).json({ error: "Category name is required" });
            return;
        }

        const newCategory = await AddCompetencyCategory({ category });
        res.status(201).json(newCategory);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Update a competency category
export const updateCompetencyCategory = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const { category } = req.body; // ✅ Corrected field name

        if (!id) {
            res.status(400).json({ error: "No ID provided" });
            return;
        }

        if (!category) {
            res.status(400).json({ error: "No data provided for update" });
            return;
        }

        const updatedCategory = await UpdateCompetencyCategory(id, { category });

        if (!updatedCategory.length) {
            res.status(404).json({ error: "Competency category not found" });
            return;
        }

        res.status(200).json(updatedCategory[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};



// ✅ Delete a competency category by ID
export const deleteCompetencyCategory = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "No ID provided" });
            return;
        }

        await DeleteCompetencyCategory(id);
        res.status(200).json({ message: "Competency category deleted successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};
