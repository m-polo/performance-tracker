import { Athlete, prisma } from "@pertrack/database";
import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { jwtMiddleware } from "../utils";
import metrics from "./metrics";

const athletes: Hono = new Hono();

//Get all athletes
athletes.get("", async (c) => {
  const athletes: Athlete[] = await prisma.athlete.findMany();
  c.status(200);

  return c.json(athletes);
});

//Get athlete
athletes.get("/:id", async (c) => {
  const athleteId = c.req.param("id");
  const athlete: Athlete = await prisma.athlete.findFirstOrThrow({
    where: { id: Number(athleteId) },
  });

  c.status(200);

  return c.json(athlete);
});

//Create athlete
athletes.post("", jwtMiddleware(), async (c) => {
  const athlete: Athlete = await c.req.json();
  const { id } = await prisma.athlete.create({
    data: athlete,
  });

  c.status(201);

  return c.json({ id });
});

//Edit athlete
athletes.put(
  "/:id",
  jwt({
    secret: "it-is-very-secret",
  }),
  async (c) => {
    const athleteId = c.req.param("id");
    const athlete: Athlete = await c.req.json();

    const { id } = await prisma.athlete.update({
      data: athlete,
      where: { id: Number(athleteId) },
    });

    c.status(200);

    return c.json(id);
  }
);

//Delete athlete
athletes.delete(
  "/:id",
  jwt({
    secret: "it-is-very-secret",
  }),
  async (c) => {
    const athleteId = c.req.param("id");
    await prisma.athlete.delete({
      where: { id: Number(athleteId) },
    });

    c.status(204);

    return;
  }
);

athletes.route("/:id/metrics", metrics);

export default athletes;
