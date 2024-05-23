import prisma from "../utils/prisma";

export const SongsRepository = {
  get: async function () {
    return prisma.song.findMany({
      select: {
        id: true,
        number: true,
        title: true,
      },
      orderBy: [{ number: "desc" }],
    });
  },
};
