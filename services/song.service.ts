import prisma from "../utils/prisma";
import { SongsRepository } from "../repositories/songs.repository";

export const SongService = {
  get: async function () {
    try {
      return await SongsRepository.get();
    } catch (error: any) {
      console.error("SongService.get error: ", error);
      throw new Error("SongService.get error: ", error);
    }
  },
};
