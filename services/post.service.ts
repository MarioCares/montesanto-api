import { ICreatePost } from "../interfaces/ICreatePost";
import prisma from "../utils/prisma";
import { POST_CATEGORY } from "../utils/constants";
import { PostsRepository } from "../repositories/posts.repository";

export const PostService = {
  get: async function (limit: number, offset: number, category: string) {
    const categoryFilter = category === "" ? { in: POST_CATEGORY } : category;
    try {
      return await PostsRepository.get(limit, offset, categoryFilter);
    } catch (error: any) {
      console.error("PostService.get error: ", error);
      throw new Error("PostService.get error: ", error);
    }
  },

  getBySlug: async function (slug: string) {
    try {
      return await PostsRepository.getBySlug(slug);
    } catch (error: any) {
      console.error("PostService.getBySlug error: ", error);
      throw new Error(`PostService.getBySlug error: ${error}`);
    }
  },

  getTags: async function () {
    try {
      const response = await PostsRepository.getTags();
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
      return await PostsRepository.getByTag(tag);
    } catch (error: any) {
      console.error("PostService.getByTag error: ", error);
      throw new Error(`PostService.getByTag error: ${error}`);
    }
  },

  getCategories: async function () {
    try {
      const response = await PostsRepository.getCategories();
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
      return PostsRepository.getByCategory(category);
    } catch (error: any) {
      console.error("PostService.getByCategory error: ", error);
      throw new Error(`PostService.getByCategory error: ${error}`);
    }
  },

  getLastDominical: async function () {
    try {
      return await PostsRepository.getLastDominical();
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

      return await PostsRepository.create(postData);
    } catch (error: any) {
      console.error("PostService.create error: ", error);
      throw new Error(
        `PostService.create error: ${error.meta ? error.meta.target : error}`
      );
    }
  },

  deleteAll: async function () {
    try {
      return await PostsRepository.deleteAll();
    } catch (error: any) {
      console.error("PostService.deleteAll error: ", error);
      throw new Error(`PostService.deleteAll error: ${error}`);
    }
  },
};
