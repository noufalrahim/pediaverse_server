import { Request, Response } from "express";
import { AddStudent, DeleteStudent, GetAllStudents, GetStudentById, UpdateStudent } from "../models/Student";

export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const students = await GetAllStudents();
        res.status(200).json(students);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

export const getStudentById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const student = await GetStudentById(id);
        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }
        res.status(200).json(student);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Add a new student
export const addStudent = async (req: Request, res: Response) => {
    try {
        const { name, rollNo, course, age, mail, location, phoneNumber, courseYear } = req.body;

        if (!name || !rollNo || !age || !mail || !location) {
            res.status(400).json({ error: "All fields are required" });
            return;
        }

        const newStudent = await AddStudent({ name, rollNo, course, age, mail, location, phoneNumber, courseYear });
        res.status(201).json(newStudent);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Update student details
export const updateStudent = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedStudent = await UpdateStudent(id, updatedData);
        if (!updatedStudent.length) {
            res.status(404).json({ error: "Student not found or no changes made" });
            return;
        }
        res.status(200).json(updatedStudent);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Delete student by ID
export const deleteStudent = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        await DeleteStudent(id);
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};
