import { Router } from "express";
import { 
    addObservation, 
    deleteObservation, 
    getAllObservations, 
    getObservationsByMentorId, 
    getObservationsByStudentId, 
    updateObservation 
} from "../controllers/observationTimeline";

const router = Router();

router.get("/", getAllObservations); 
router.get("/student/:studentId", getObservationsByStudentId); 
router.get("/mentor/:mentorId", getObservationsByMentorId); 
router.post("/", addObservation); 
router.put("/:id", updateObservation); 
router.delete("/:id", deleteObservation); 

export default router;
