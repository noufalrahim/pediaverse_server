import { Router } from "express";
import { 
    addEducation, 
    deleteEducation, 
    getAllEducations, 
    getEducationByStudentId, 
    updateEducation 
} from "../controllers/education";

const router = Router();

router.get("/", getAllEducations); 
router.get("/:id", getEducationByStudentId); 
router.post("/", addEducation);
router.put("/:id", updateEducation); 
router.delete("/:id", deleteEducation); 

export default router;
