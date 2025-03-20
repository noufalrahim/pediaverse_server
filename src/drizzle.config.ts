import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: "postgresql",
    schema: "./db/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        host: "localhost",
        port: 5432,
        database: "pediaversedb",
        user: "sanin",
        password: "sanin",
        ssl: false,
    },
});