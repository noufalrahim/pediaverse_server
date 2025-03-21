import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") }); // Go one level up

import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./db/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        host: "localhost",
        port: 5432,
        database: process.env.POSTGRES_DB || "pediaversedb",
        user: process.env.POSTGRES_USER || "sanin",
        password: process.env.POSTGRES_PASSWORD || "sanin",
        ssl: false,
    },
});