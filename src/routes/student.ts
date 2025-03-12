import { Router } from "express";
import { getAllStudents, getStudentById } from "../controllers/student";

const router = Router();

router.get('/', getAllStudents);
router.post('/student', getStudentById);

export default router;