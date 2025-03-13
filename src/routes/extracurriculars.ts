import { Router } from "express";
import { 
    addExtracurricular, 
    deleteExtracurricular, 
    getAllExtracurriculars, 
    getExtracurricularsByStudentId,
    updateExtracurricular  
} from "../controllers/extracurriculars";

const router = Router();

router.get("/", getAllExtracurriculars); 
router.get("/:studentId", getExtracurricularsByStudentId); 
router.post("/", addExtracurricular); 
router.put("/:id", updateExtracurricular); 
router.delete("/:id", deleteExtracurricular); 

export default router;
