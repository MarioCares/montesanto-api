import { serve } from "@hono/node-server";
import { Hono } from "hono";
import posts from "../routes/posts";
import songs from "../routes/songs";
import message from "../routes/message";
import users from "../routes/users";
import { csrf } from "hono/csrf";
import middleware from "./middleware";

const app = new Hono();

app.use(csrf());

app.use("*", middleware);

app.route("/publicacion", posts);
app.route("/himnario", songs);
app.route("/contacto", message);
app.route("/usuario", users);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = 4000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
