CREATE TABLE IF NOT EXISTS "Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_id" text NOT NULL,
	"address" text NOT NULL,
	"expoToken" text NOT NULL,
	CONSTRAINT "Users_clerk_id_unique" UNIQUE("clerk_id")
);
