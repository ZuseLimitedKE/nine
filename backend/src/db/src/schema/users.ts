import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("Users", {
    id: serial("id").primaryKey(),
    clerkID: text("clerk_id").notNull().unique(),
    address: text("address").notNull(),
    expoToken: text("expoToken").notNull()
})