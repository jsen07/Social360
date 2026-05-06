import "dotenv/config";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { users, invitations, companies, companyUsers } from "../db/schema.js";
import { sendInviteEmail } from "../utils/email.js";

export const resolvers = {
  Query: {
    users: async (_: unknown, __: unknown, { db }: any) => {
      return await db.select().from(users);
    },
  },

  Mutation: {
    createUser: async (
      _: unknown,
      { email, cognitoSub }: { email: string; cognitoSub: string },
      { db }: any,
    ) => {
      const inserted = await db
        .insert(users)
        .values({ email, cognitoSub })
        .onConflictDoNothing({
          target: users.cognitoSub,
        })
        .returning();

      if (inserted.length > 0) return inserted[0];

      const existing = await db
        .select()
        .from(users)
        .where(eq(users.cognitoSub, cognitoSub));

      return existing[0];
    },

    inviteEmployee: async (
      _: unknown,
      {
        email,
        companyId,
        role,
      }: {
        email: string;
        companyId: string;
        role: string;
      },
      { db }: any,
    ) => {
      const token = crypto.randomUUID();

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      const [invite] = await db
        .insert(invitations)
        .values({
          email,
          companyId: Number(companyId),
          role,
          token,
          expiresAt,
        })
        .onConflictDoNothing({
          target: [invitations.email, invitations.companyId],
        })
        .returning();

      if (!invite) {
        throw new Error(
          "This employee has already been invited to this company.",
        );
      }

      const inviteUrl = `${process.env.APP_URL}/accept-invite?token=${token}`;

      await sendInviteEmail({
        to: email,
        inviteUrl,
        companyName: "Social360",
      });

      return true;
    },

    createBusinessAccount: async (
      _: unknown,
      {
        email,
        cognitoSub,
        fullname,
        companyName,
        role,
      }: {
        email: string;
        cognitoSub: string;
        fullname: string;
        companyName: string;
        role: "Owner" | "Manager";
      },
      { db }: any,
    ) => {
      const [user] = await db
        .insert(users)
        .values({ email, cognitoSub, fullname })
        .onConflictDoNothing({
          target: users.cognitoSub,
        })
        .returning();

      const [company] = await db
        .insert(companies)
        .values({ name: companyName })
        .returning();

      await db.insert(companyUsers).values({
        userId: user.id,
        companyId: company.id,
        role,
      });

      return {
        user,
        company,
        role,
      };
    },
  },
};
