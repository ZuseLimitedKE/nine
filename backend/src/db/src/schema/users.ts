import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("Users", {
    id: serial("id").primaryKey(),
    address: text("address").notNull(),
    expoToken: text("expoToken").notNull()
})