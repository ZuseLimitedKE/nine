CREATE TABLE IF NOT EXISTS "cid" (
	"id" text PRIMARY KEY NOT NULL,
	"cid" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"payer_adrress" text NOT NULL
);
