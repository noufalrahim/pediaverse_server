import { Request, Response } from "express";
import { 
    AddMentor, 
    DeleteMentor, 
    GetAllMentors, 
    GetMentorById, 
    UpdateMentor // ✅ Import Update Function
} from "../models/Mentor";

// ✅ Get all mentors
export const getAllMentors = async (req: Request, res: Response) => {
    try {
        const data = await GetAllMentors();
        res.status(200).json(data);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Get mentor by ID
export const getMentorById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "No Mentor ID provided" });
            return;
        }

        const mentor = await GetMentorById(id);
        if (!mentor) {
            res.status(404).json({ error: "Mentor not found" });
            return;
        }

        res.status(200).json(mentor);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Add new mentor
export const addMentor = async (req: Request, res: Response) => {
    try {
        const { username, name, password, phoneNumber } = req.body;

        if (!username || !name || !password || !phoneNumber) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        const newMentor = await AddMentor({ username, name, password, phoneNumber });
        res.status(201).json(newMentor);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Update mentor by ID
export const updateMentor = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const { username, name, password, phoneNumber } = req.body;

        if (!id) {
            res.status(400).json({ error: "No Mentor ID provided" });
            return;
        }

        const updatedData: Partial<{ username: string; name: string; password: string; phoneNumber: string }> = {};
        if (username) updatedData.username = username;
        if (name) updatedData.name = name;
        if (password) updatedData.password = password;
        if (phoneNumber) updatedData.phoneNumber = phoneNumber;

        const updatedMentor = await UpdateMentor(id, updatedData);

        if (!updatedMentor.length) {
            res.status(404).json({ error: "Mentor not found" });
            return;
        }

        res.status(200).json(updatedMentor[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};

// ✅ Delete mentor by ID
export const deleteMentor = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "No Mentor ID provided" });
            return;
        }

        await DeleteMentor(id);
        res.status(200).json({ message: "Mentor deleted successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred" });
    }
};
