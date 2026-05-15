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

    getUserProfile: async (_: unknown, __: unknown, { db, authUser }: any) => {
      if (!authUser) {
        throw new Error("Unauthorized");
      }

      const [result] = await db
        .select({
          userId: users.id,
          email: users.email,
          cognitoSub: users.cognitoSub,
          fullname: users.fullname,
          birthdate: users.birthdate,
          gender: users.gender,
          createdAt: users.createdAt,

          companyId: companies.id,
          companyName: companies.name,
          hasCompletedOnboarding: companies.hasCompletedOnboarding,

          role: companyUsers.role,
        })
        .from(users)
        .leftJoin(companyUsers, eq(users.id, companyUsers.userId))
        .leftJoin(companies, eq(companyUsers.companyId, companies.id))
        .where(eq(users.cognitoSub, authUser.sub));

      if (!result) return null;

      // Payload
      return {
        id: result.userId,
        email: result.email,
        fullname: result.fullname,
        birthdate: result.birthdate,
        gender: result.gender,
        createdAt: result.createdAt,

        companies: result.companyId
          ? [
              {
                id: result.companyId,
                name: result.companyName,
                hasCompletedOnboarding: result.hasCompletedOnboarding,
                role: result.role,
              },
            ]
          : [],
      };
    },
  },

  Mutation: {
    createUser: async (
      _: unknown,
      { email }: { email: string },
      { db, authUser }: any,
    ) => {
      if (!authUser) {
        throw new Error("Unauthorized");
      }

      const [user] = await db
        .insert(users)
        .values({ email, cognitoSub: authUser.sub })
        .onConflictDoUpdate({
          target: users.cognitoSub,
          set: {
            email,
          },
        })
        .returning();

      return user;
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
        companyName: "Sixo",
      });

      return true;
    },

    saveOnboardingDetails: async (
      _: unknown,
      {
        fullname,
        companyRole,
        companyName,
        businessType,
        numberOfLocations,
        employeeCountRange,
      }: {
        fullname: string;
        companyRole: string;
        companyName: string;
        businessType: string;
        numberOfLocations?: number | null;
        employeeCountRange: string;
      },
      { db, authUser }: any,
    ) => {
      console.log("Resolver authUser:", authUser?.sub);
      if (!authUser) {
        throw new Error("Unauthorized");
      }

      const [user] = await db
        .update(users)
        .set({ fullname })
        .where(eq(users.cognitoSub, authUser.sub))
        .returning();

      if (!user) {
        throw new Error("User not found");
      }

      const [company] = await db
        .insert(companies)
        .values({
          name: companyName,
          businessType: businessType,
          numberOfLocations: numberOfLocations ?? null,
          employeeCountRange: employeeCountRange,
          hasCompletedOnboarding: true,
        })
        .returning();

      await db.insert(companyUsers).values({
        userId: user.id,
        companyId: company.id,
        role: companyRole,
      });

      return company;
    },
  },
};
