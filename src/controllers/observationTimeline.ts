import { Request, Response } from "express";
import { 
    AddObservation, 
    DeleteObservation, 
    GetAllObservations, 
    GetObservationsByStudentId, 
    GetObservationsByMentorId ,
    UpdateObservation
} from "../models/ObservationTimeline";
import { NewObservationTimeline } from "../db/schema"; // ✅ Add this line

// ✅ Get all observations
export const getAllObservations = async (req: Request, res: Response) => {
    try {
        const data = await GetAllObservations();
        res.status(200).json(data);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Get observations by student ID
export const getObservationsByStudentId = async (req: Request<{ studentId: string }>, res: Response) => {
    try {
        const { studentId } = req.params;
        if (!studentId) {
            res.status(400).json({ error: "No student ID provided" });
            return;
        }

        const observations = await GetObservationsByStudentId(studentId);
        res.status(200).json(observations);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Get observations by mentor ID
export const getObservationsByMentorId = async (req: Request<{ mentorId: string }>, res: Response) => {
    try {
        const { mentorId } = req.params;
        if (!mentorId) {
            res.status(400).json({ error: "No mentor ID provided" });
            return;
        }

        const observations = await GetObservationsByMentorId(mentorId);
        res.status(200).json(observations);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Add a new observation
export const addObservation = async (req: Request, res: Response) => {
    try {
        const { studentId, mentorId, title, description } = req.body;

        if (!studentId || !mentorId || !title || !description) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        const newObservation = await AddObservation({ studentId, mentorId, title, description });
        res.status(201).json(newObservation);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Update an observation
export const updateObservation = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!id) {
            res.status(400).json({ error: "No ID provided" });
            return;
        }

        const updatedData: Partial<NewObservationTimeline> = {};
        if (title) updatedData.title = title;
        if (description) updatedData.description = description;

        const updatedObservation = await UpdateObservation(id, updatedData);

        if (!updatedObservation.length) {
            res.status(404).json({ error: "Observation not found" });
            return;
        }

        res.status(200).json(updatedObservation[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};



// ✅ Delete an observation by ID
export const deleteObservation = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "No ID provided" });
            return;
        }

        await DeleteObservation(id);
        res.status(200).json({ message: "Observation deleted successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};
