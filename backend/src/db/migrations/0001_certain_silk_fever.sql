ALTER TABLE "Users" DROP CONSTRAINT "Users_clerk_id_unique";--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN IF EXISTS "clerk_id";