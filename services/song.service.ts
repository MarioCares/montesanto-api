import { SongsRepository } from "../repositories/songs.repository";
import { ICreateSong } from "../interfaces/iCreateSong";

export const SongService = {
  get: async function () {
    try {
      return await SongsRepository.get();
    } catch (error: any) {
      console.error("SongService.get error: ", error);
      throw new Error("SongService.get error: ", error);
    }
  },
  getByNumber: async function (number: number) {
    try {
      return await SongsRepository.getByNumber(number);
    } catch (error: any) {
      console.error("SongService.getByNumber error: ", error);
      throw new Error("SongService.getByNumber error: ", error);
    }
  },
  post: async function (postData: ICreateSong) {
    try {
      return await SongsRepository.create(postData);
    } catch (error: any) {
      console.error("SongService.post error: ", error);
      throw new Error("SongService.post error: ", error);
    }
  },
};
