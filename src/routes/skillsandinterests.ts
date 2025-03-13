import { Router } from "express";
import { 
    addSkillsAndInterests, 
    deleteSkillsAndInterests, 
    getAllSkillsAndInterests, 
    getSkillsAndInterestsByStudentId,
    updateSkillsAndInterests
} from "../controllers/skillsandinterests";

const router = Router();

router.get("/", getAllSkillsAndInterests); 
router.get("/:studentId", getSkillsAndInterestsByStudentId); 
router.post("/", addSkillsAndInterests); 
router.put("/:id", updateSkillsAndInterests); 
router.delete("/:id", deleteSkillsAndInterests); 

export default router;
