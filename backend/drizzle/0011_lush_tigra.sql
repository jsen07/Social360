CREATE TABLE "departments" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "company_users" ADD COLUMN "employment_status" text DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "company_users" ADD COLUMN "wage_rate" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "company_users" ADD COLUMN "wage_type" text DEFAULT 'hourly';--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;