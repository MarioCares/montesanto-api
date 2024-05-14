import { ICreatePost } from "../interfaces/ICreatePost";
import prisma from "../utils/prisma";

export const PostService = {
  get: async function (limit: number, offset: number) {
    try {
      return await prisma.post.findMany({
        orderBy: [{ postAt: "desc" }],
        include: {
          PostTags: true,
        },
        take: limit,
        skip: offset,
      });
    } catch (error: any) {
      console.error("PostService.get error: ", error);
      throw new Error("PostService.get error: ", error);
    }
  },

  getBySlug: async function (slug: string) {
    try {
      return await prisma.post.findUnique({
        where: {
          slug,
        },
        include: { PostTags: true },
      });
    } catch (error: any) {
      console.error("PostService.getBySlug error: ", error);
      throw new Error(`PostService.getBySlug error: ${error}`);
    }
  },

  getTags: async function () {
    try {
      const response = await prisma.postTags.groupBy({
        by: ["description"],
      });
      const tags = response.map(
        (tag: { description: string }) => tag.description
      );
      return [...new Set(tags)];
    } catch (error: any) {
      console.error("PostService.getTags error: ", error);
      throw new Error(`PostService.getTags error: ${error}`);
    }
  },

  getByTag: async function (tag: string) {
    try {
      return await prisma.post.findMany({
        orderBy: [
          {
            postAt: "desc",
          },
        ],
        include: { PostTags: true },
        where: { PostTags: { some: { description: tag } } },
      });
    } catch (error: any) {
      console.error("PostService.getByTag error: ", error);
      throw new Error(`PostService.getByTag error: ${error}`);
    }
  },

  getCategories: async function () {
    try {
      const response = await prisma.post.groupBy({
        by: ["category"],
        _count: {
          _all: true,
        },
      });
      return response.reduce((acc: { [key: string]: number }, curr) => {
        acc[curr.category] = curr._count._all;
        return acc;
      }, {});
    } catch (error: any) {
      console.error("PostService.getCategories error: ", error);
      throw new Error(`PostService.getCategories error: ${error}`);
    }
  },

  getByCategory: async function (category: string) {
    try {
      return await prisma.post.findMany({
        orderBy: [
          {
            postAt: "desc",
          },
        ],
        where: {
          category,
        },
        include: { PostTags: true },
      });
    } catch (error: any) {
      console.error("PostService.getByCategory error: ", error);
      throw new Error(`PostService.getByCategory error: ${error}`);
    }
  },

  getLastDominical: async function () {
    try {
      return await prisma.post.findFirst({
        orderBy: [
          {
            postAt: "desc",
          },
        ],
        where: {
          category: "Palabra Dominical",
        },
        include: { PostTags: true },
      });
    } catch (error: any) {
      console.error("PostService.getLastDominical error: ", error);
      throw new Error(`PostService.getLastDominical error: ${error}`);
    }
  },

  create: async function (requestData: ICreatePost) {
    try {
      const postTags = requestData.tags!.map((tag: string) => ({
        description: tag,
      }));
      const postData = { ...requestData, PostTags: { create: postTags } };
      delete postData.tags;

      return await prisma.post.create({
        data: postData,
      });
    } catch (error: any) {
      console.error("PostService.create error: ", error);
      throw new Error(
        `PostService.post error: ${error.meta ? error.meta.target : error}`
      );
    }
  },

  deleteAll: async function () {
    try {
      return await prisma.post.deleteMany();
    } catch (error: any) {
      console.error("PostService.deleteAll error: ", error);
      throw new Error(`PostService.deleteAll error: ${error}`);
    }
  },
};
