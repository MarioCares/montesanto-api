import { Hono } from "hono";
import { PostService } from "../services/post.service";

const app = new Hono();

app.get("/", async (c) => {
  const { limit, offset, category } = c.req.query();
  try {
    return c.json(
      await PostService.get(
        limit ? Number(limit) : 10,
        offset ? Number(offset) : 0,
        category ?? ""
      )
    );
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get("/tags", async (c) => {
  try {
    return c.json(await PostService.getTags());
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get("/tag/:tag", async (c) => {
  try {
    return c.json(await PostService.getByTag(c.req.param("tag")));
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get("/categorias", async (c) => {
  try {
    return c.json(await PostService.getCategories());
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get("/categoria/:categoria", async (c) => {
  try {
    return c.json(await PostService.getByCategory(c.req.param("categoria")));
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get("/ultima-palabra", async (c) => {
  try {
    const post = await PostService.getLastDominical();
    return c.json(post);
  } catch (error: any) {
    console.error("/publicacion/ultima-palabra GET -> ", error, error);
    return c.json({ error: error.message }, 500);
  }
});

app.get("/:slug", async (c) => {
  try {
    const post = await PostService.getBySlug(c.req.param("slug"));
    if (post) {
      return c.json(post);
    } else {
      return c.json({ error: "Publicación no existe" }, 404);
    }
  } catch (error: any) {
    console.error(
      `/publicacion/:slug GET -> '${c.req.param("slug")}' error`,
      error
    );
    return c.json({ error: error.message }, 500);
  }
});

app.post("/", async (c) => {
  try {
    return c.json(await PostService.create(await c.req.json()));
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.delete("/", async (c) => {
  try {
    return c.json(await PostService.deleteAll());
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

export default app;
