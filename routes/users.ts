import { Hono } from "hono";
import { UserService } from "../services/user.service";
import { StatusCode } from "hono/utils/http-status";
import { lucia } from "../utils/auth";
import { User } from "@prisma/client";

const app = new Hono<{
  Variables: {
    user: User | null;
  };
}>();

app.post("/registro", async (c) => {
  try {
    const response = await UserService.create(await c.req.json());
    return c.json(response, response.statusCode as StatusCode);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.post("/login", async (c) => {
  try {
    const response = await UserService.login(await c.req.json());
    if (response.statusCode === 200) {
      const session = await lucia.createSession((response.data as User).id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      return c.json(response, response.statusCode as StatusCode, {
        "Set-Cookie": sessionCookie.serialize(),
      });
    }
    return c.json(response, response.statusCode as StatusCode);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get("/logout", async (c) => {
  try {
    const user = c.get("user");
    if (!user) {
      return c.json(null, 401);
    }
    await lucia.invalidateSession(user.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    return c.json(
      { message: "Usuario desconectado con éxito", statusCode: 200 },
      200,
      {
        "Set-Cookie": sessionCookie.serialize(),
      }
    );
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

export default app;
