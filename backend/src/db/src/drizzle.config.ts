import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
    dialect: 'postgresql',
    schema: "./src/db/src/schema/index.ts",
    out: "./src/db/migrations",
    dbCredentials: {
        url: process.env.NEON_CONNECTION_STRING
    }
});