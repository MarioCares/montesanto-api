import { ICreateMessage } from "../interfaces/ICreateMessage";
import prisma from "../utils/prisma";

export const MessagesRepository = {
  create: async function (requestData: ICreateMessage) {
    return prisma.message.create({
      data: requestData,
    });
  },
};
