import express from 'express';
import studentsRouter from './routes/student';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/students", studentsRouter);

app.use('/', (req, res) => {
    res.send("Welcome to pediaverse server!");
});

app.listen(8000, () => {
    console.log("Sever started on PORT 8000");
});