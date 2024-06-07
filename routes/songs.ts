import { Hono } from "hono";
import { SongService } from "../services/song.service";

const app = new Hono();

app.get("/", async (c) => {
  try {
    return c.json(await SongService.get());
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get("/:number", async (c) => {
  try {
    const song = await SongService.getByNumber(Number(c.req.param("number")));
    if (song) {
      return c.json(song);
    } else {
      return c.json({ error: "Canción no existe" }, 404);
    }
  } catch (error: any) {
    console.error(
      `/himnario/:number GET -> '${c.req.param("number")}' error`,
      error
    );
    return c.json({ error: error.message }, 500);
  }
});

app.post("/", async (c) => {
  try {
    return c.json(await SongService.post(await c.req.json()));
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

export default app;
