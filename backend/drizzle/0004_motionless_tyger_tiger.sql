ALTER TABLE "companies" ADD COLUMN "business_type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "has_completed_onboarding" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "onboarding_step" integer DEFAULT 0 NOT NULL;