import { Router } from "express";
import { 
    addCompetencyCategory, 
    deleteCompetencyCategory, 
    getAllCompetencyCategories, 
    getCompetencyCategoryById,
    updateCompetencyCategory 
} from "../controllers/competencyCategory";

const router = Router();

router.get("/", getAllCompetencyCategories); 
router.get("/:id", getCompetencyCategoryById); 
router.post("/", addCompetencyCategory); 
router.put("/:id", updateCompetencyCategory); 
router.delete("/:id", deleteCompetencyCategory); 

export default router;
