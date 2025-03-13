import { Router } from "express";
import { 
    addMentor, 
    deleteMentor, 
    getAllMentors, 
    getMentorById, 
    updateMentor 
} from "../controllers/mentor";

const router = Router();

router.get("/", getAllMentors); 
router.get("/:id", getMentorById); 
router.post("/", addMentor); 
router.put("/:id", updateMentor); 
router.delete("/:id", deleteMentor); 

export default router;
