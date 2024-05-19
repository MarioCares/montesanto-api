import { Hono } from "hono";
import { MessageService } from "../services/message.service";

const app = new Hono();

app.post("/", async (c) => {
  try {
    return c.json(await MessageService.create(await c.req.json()));
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

export default app;
