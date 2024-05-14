import prisma from "../utils/prisma";

export const SongService = {
  get: async function () {
    try {
      return await prisma.song.findMany({
        select: {
          id: true,
          number: true,
          title: true,
        },
        orderBy: [{ number: "desc" }],
      });
    } catch (error: any) {
      console.error("PostService.get error: ", error);
      throw new Error("PostService.get error: ", error);
    }
  },
};
