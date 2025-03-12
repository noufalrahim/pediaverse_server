import { Request, Response } from "express";
import { GetAllStudents, GetStudentById } from "../models/Student";

export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const data = await GetAllStudents();
        res.status(200).json(data);
        return;
    }
    catch (e) {
        console.log(e)
        res.status(500).json({error: 'An error occured'})
    }
};

export const getStudentById = async (req: Request<{}, {}, {id: string}>, res: Response) => {
    try {
        const {id} = req.body;
        if(!id) {
            res.status(400).json({error: 'No Id provided'});
            return;
        }

        const student = await GetStudentById(id);
        res.status(200).json(student);
        return;
    }
    catch (e) {
        res.status(500).json({error: 'An error occured'})
    }
};
