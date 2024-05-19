import { serve } from "@hono/node-server";
import { Hono } from "hono";
import posts from "../routes/posts";
import songs from "../routes/songs";
import message from "../routes/message";

const app = new Hono();

app.route("/publicacion", posts);
app.route("/himnario", songs);
app.route("/contacto", message);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = 4000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
