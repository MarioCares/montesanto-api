import prisma from "../utils/prisma";
import { ICreateSong } from "../interfaces/iCreateSong";

export const SongsRepository = {
  get: async function () {
    return prisma.song.findMany({
      select: {
        id: true,
        number: true,
        title: true,
      },
      orderBy: [{ number: "asc" }],
    });
  },
  getByNumber: async function (number: number) {
    return prisma.song.findFirst({
      where: {
        number,
      },
    });
  },
  create: async function (postData: ICreateSong) {
    return prisma.song.create({
      data: postData,
    });
  },
};
