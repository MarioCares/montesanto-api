import { ICreateMessage } from "../interfaces/ICreateMessage";
import prisma from "../utils/prisma";
import { MessagesRepository } from "../repositories/messages.repository";

export const MessageService = {
  create: async function (requestData: ICreateMessage) {
    try {
      return await MessagesRepository.create(requestData);
    } catch (error: any) {
      console.error("MessageService.create error: ", error);
      throw new Error(
        `MessageService.create error: ${error.meta ? error.meta.target : error}`
      );
    }
  },
};
