import {PrismaClient} from "@prisma/client";
import {ICreatePost} from "../interfaces/ICreatePost";

export const PostService = {
  get: async function () {
    try {
      const prisma = new PrismaClient();
      return await prisma.post.findMany({
        orderBy: [
          { postAt: "desc"}
        ],
        include: {
          PostTags: true
        }
      });
    } catch (error: any) {
      throw new Error("PostService.get error: ", error);
    }
  },

  getBySlug: async function (slug: string) {
    try {
      const prisma = new PrismaClient();
      return await prisma.post.findUnique({
        where: {
          slug,
        },
        include: { PostTags: true },
      });
    } catch (error: any) {
      throw new Error(`PostService.getBySlug error: ${error}`);
    }
  },

  getTags: async function () {
    try {
      const prisma = new PrismaClient();
      const response = await prisma.postTags.groupBy({
        by: ['description'],
      });
      const tags = response.map((tag: { description: string }) => tag.description);
      return [...new Set(tags)];
    } catch (error: any) {
      throw new Error(`PostService.getTags error: ${error}`);
    }
  },

  getByTag: async function (tag: string) {
    try {
      const prisma = new PrismaClient();
      return await prisma.post.findMany({
        orderBy: [
          {
            postAt: 'desc',
          },
        ],
        include: { PostTags: true },
        where: { PostTags: { some: { description: tag } } },
      });
    } catch (error: any) {
      throw new Error(`PostService.getByTag error: ${error}`);
    }
  },

  getCategories: async function () {
    try {
      const prisma = new PrismaClient();
      const response = await prisma.post.groupBy({
        by: ['category'],
        _count: {
          _all: true,
        },
      });
      return response.reduce((acc: { [key: string]: number }, curr) => {
        acc[curr.category] = curr._count._all;
        return acc;
      }, {});
    } catch (error: any) {
      throw new Error(`PostService.getCategories error: ${error}`);
    }
  },

  getByCategory: async function (category: string) {
    try {
      const prisma = new PrismaClient();
      return await prisma.post.findMany({
        orderBy: [
          {
            postAt: 'desc',
          },
        ],
        where: {
          category,
        },
        include: { PostTags: true },
      });
    } catch (error: any) {
      throw new Error(`PostService.getByCategory error: ${error}`);
    }
  },

  create: async function (requestData: ICreatePost) {
    try {
      const prisma = new PrismaClient();
      const postTags = requestData.tags!.map((tag: string) => ({ description: tag }));
      const postData = { ...requestData, PostTags: { create: postTags } };
      delete postData.tags;

      return await prisma.post.create({
        data: postData,
      });
    } catch (error: any) {
      throw new Error(`PostService.post error: ${error.meta ? error.meta.target : error}`);
    }
  },

  deleteAll: async function () {
    try {
      const prisma = new PrismaClient();
      return await prisma.post.deleteMany();
    } catch (error: any) {
      throw new Error(`PostService.deleteAll error: ${error}`);
    }
  }
}