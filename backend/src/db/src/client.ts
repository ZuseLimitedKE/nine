import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";
const sql = neon(process.env.NEON_CONNECTION_STRING);
const db = drizzle(sql);
export default db;