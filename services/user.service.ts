import prisma from "../utils/prisma";
import { UsersRepository } from "../repositories/users.repository";
import { isValidEmail } from "../utils/validations";
import { Argon2id } from "oslo/password";
import { generateIdFromEntropySize } from "lucia";
import { User } from "@prisma/client";
import { verify } from "node:crypto";
import { lucia } from "../utils/auth";

export const UserService = {
  create: async function (requestData: User) {
    try {
      if (!requestData.email || !isValidEmail(requestData.email)) {
        return {
          statusCode: 400,
          message: "Email incorrecto",
        };
      }

      const emailExists = await UsersRepository.getByEmail(requestData.email);
      if (emailExists) {
        return {
          statusCode: 400,
          message: "Email ya registrado",
        };
      }

      const passwordHash = await new Argon2id().hash(requestData.password_hash);
      const userId = generateIdFromEntropySize(10);

      const createdUser = await UsersRepository.create({
        password_hash: passwordHash,
        id: userId,
        email: requestData.email,
        userName: requestData.userName,
      });

      return {
        statusCode: 200,
        message: "Usuario creado",
        data: createdUser,
      };
    } catch (error: any) {
      console.error("UserService.create error: ", error);
      throw new Error(
        `UserService.create error: ${error.meta ? error.meta.target : error}`
      );
    }
  },

  login: async function (requestData: Partial<User>) {
    try {
      if (!requestData.email || !isValidEmail(requestData.email)) {
        return {
          statusCode: 400,
          message: "Email incorrecto",
        };
      }

      const user = await UsersRepository.getByEmail(requestData.email);
      if (!user) {
        return {
          statusCode: 400,
          message: "Email o contraseña inválidas",
        };
      }

      const validPassword = await new Argon2id().verify(
        user.password_hash,
        requestData.password_hash ?? ""
      );

      if (!validPassword) {
        return {
          statusCode: 400,
          message: "Email o contraseña inválidas",
        };
      }

      return {
        statusCode: 200,
        message: "Usuario OK",
        data: {
          id: user.id,
          userName: user.userName,
          email: user.email,
        },
      };
    } catch (error: any) {
      console.error("UserService.create error: ", error);
      throw new Error(
        `UserService.create error: ${error.meta ? error.meta.target : error}`
      );
    }
  },
};
