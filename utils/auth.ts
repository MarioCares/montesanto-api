import { Lucia } from "lucia";
import prisma from "../utils/prisma";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { IMUser } from "../interfaces/IMUser";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      userName: attributes.userName,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: IMUser;
  }
}
