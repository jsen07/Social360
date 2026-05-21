import {
  pgTable,
  serial,
  text,
  timestamp,
  date,
  integer,
  unique,
  boolean,
  numeric,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  cognitoSub: text("cognito_sub").notNull().unique(),
  fullname: text("fullname"),
  birthdate: date("birthdate"),
  gender: text("gender"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  businessType: text("business_type"),
  numberOfLocations: integer("number_of_locations"),
  employeeCountRange: text("employee_count_range"),
  hasCompletedOnboarding: boolean("has_completed_onboarding")
    .notNull()
    .default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const companyUsers = pgTable(
  "company_users",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    companyId: integer("company_id")
      .notNull()
      .references(() => companies.id, { onDelete: "cascade" }),
    accountRole: text("account_role").notNull(),
    employmentStatus: text("employment_status").default("active"),
    wageRate: numeric("wage_rate", { precision: 10, scale: 2 }),
    wageType: text("wage_type").default("hourly"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    uniqueUserCompany: unique().on(table.userId, table.companyId),
  }),
);

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const invitations = pgTable(
  "invitations",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    companyId: integer("company_id")
      .notNull()
      .references(() => companies.id, { onDelete: "cascade" }),
    role: text("role").notNull(),
    token: text("token").notNull().unique(),
    acceptedAt: timestamp("accepted_at"),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    uniqueEmailPerCompany: unique().on(table.email, table.companyId),
  }),
);
