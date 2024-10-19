CREATE TABLE IF NOT EXISTS "payments" (
	"cid" text PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"payer_address" text NOT NULL,
	"payee_address" text NOT NULL
);
