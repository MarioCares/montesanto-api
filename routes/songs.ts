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

export default app;
