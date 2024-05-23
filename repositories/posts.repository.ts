import prisma from "../utils/prisma";

interface CreatePost {
  PostTags: {
    create: {
      description: string;
    }[];
  };
  slug: string;
  postAt: string;
  originalAuthor: string;
  introduction: string;
  originallyPublish: string;
  body: string;
  title: string;
  subtitle: string;
  publisher: string;
  category: string;
}

export const PostsRepository = {
  get: async function (
    limit: number,
    offset: number,
    categoryFilter: string | object
  ) {
    return prisma.post.findMany({
      where: {
        category: categoryFilter,
      },
      orderBy: [{ postAt: "desc" }],
      include: {
        PostTags: true,
      },
      take: limit,
      skip: offset,
    });
  },

  getBySlug: async function (slug: string) {
    return prisma.post.findUnique({
      where: {
        slug,
      },
      include: { PostTags: true },
    });
  },

  getTags: async function () {
    return prisma.postTags.groupBy({
      by: ["description"],
    });
  },

  getByTag: async function (tag: string) {
    return prisma.post.findMany({
      orderBy: [
        {
          postAt: "desc",
        },
      ],
      include: { PostTags: true },
      where: { PostTags: { some: { description: tag } } },
    });
  },

  getCategories: async function () {
    return prisma.post.groupBy({
      by: ["category"],
      _count: {
        _all: true,
      },
    });
  },

  getByCategory: async function (category: string) {
    return prisma.post.findMany({
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
  },

  getLastDominical: async function () {
    return prisma.post.findFirst({
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
  },

  create: async function (postData: CreatePost) {
    return prisma.post.create({
      data: postData,
    });
  },

  deleteAll: async function () {
    return prisma.post.deleteMany();
  },
};
