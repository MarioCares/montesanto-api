import prisma from "../utils/prisma";
import { User } from "@prisma/client";

export const UsersRepository = {
  getByEmail: async function (email: string) {
    return prisma.user.findFirst({
      where: {
        email,
      },
    });
  },

  create: async function (user: User) {
    return prisma.user.create({ data: user });
  },
};
