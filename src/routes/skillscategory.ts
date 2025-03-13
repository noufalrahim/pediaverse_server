import { Router } from "express";
import { 
    addSkillsCategory, 
    deleteSkillsCategory, 
    getAllSkillsCategories, 
    getSkillsCategoryById, 
    updateSkillsCategory 
} from "../controllers/skillscategory";

const router = Router();

router.get("/", getAllSkillsCategories); 
router.get("/:id", getSkillsCategoryById); 
router.post("/", addSkillsCategory); 
router.put("/:id", updateSkillsCategory); 
router.delete("/:id", deleteSkillsCategory); 

export default router;
