import { Router } from "express";
import { 
    addCompetency, 
    deleteCompetency, 
    getAllCompetencies, 
    getCompetenciesByStudentId, 
    updateCompetency 
} from "../controllers/competency";

const router = Router();

router.get("/", getAllCompetencies); 
router.get("/student/:studentId", getCompetenciesByStudentId); 
router.post("/", addCompetency); 
router.put("/:id", updateCompetency); 
router.delete("/:id", deleteCompetency); 

export default router;
