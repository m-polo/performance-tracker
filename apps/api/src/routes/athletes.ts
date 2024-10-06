import { Athlete, Metric, Prisma, prisma } from "@pertrack/database";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import metrics from "./metrics";
import { authMiddleware } from "../middlewares";

const athletes: Hono = new Hono();

athletes.get("", async (c) => {
  try {
    const searchText: string | undefined = c.req.query("searchText");
    let whereClause: Prisma.AthleteWhereInput = {};

    if (searchText) {
      whereClause.OR = [
        {
          name: { contains: searchText, mode: "insensitive" },
        },
        {
          team: { contains: searchText, mode: "insensitive" },
        },
      ];
    }

    const athletes: Athlete[] = await prisma.athlete.findMany({
      where: whereClause,
    });

    return c.json(athletes, 200);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error getting athletes list",cause: error
    });
  }
});

athletes.get("/:id", async (c) => {
  try {
    const athleteId = c.req.param("id");
    const athlete: Athlete & { metrics: Metric[] } =
      await prisma.athlete.findFirstOrThrow({
        where: { id: Number(athleteId) },
        include: { metrics: true },
      });

    return c.json(athlete, 200);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error getting athlete", cause: error
    });
  }
});

athletes.post("", authMiddleware(), async (c) => {
  try {
    const athlete: Athlete = await c.req.json<Athlete>();
    const { id } = await prisma.athlete.create({
      data: {
        ...athlete,
        age: Number(athlete.age),
      },
    });

    return c.json({ id, athlete }, 201);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error adding athlete", cause: error
    });
  }
});

athletes.put("/:id", authMiddleware(), async (c) => {
  try {
    const athleteId = c.req.param("id");
    const athlete: Athlete = await c.req.json();

    const { id } = await prisma.athlete.update({
      data: {
        ...athlete,
        age: Number(athlete.age),
      },
      where: { id: Number(athleteId) },
    });

    return c.json(id, 200);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error editing athlete", cause: error
    });
  }
});

athletes.delete("/:id", authMiddleware(), async (c) => {
  try {
    const athleteId = c.req.param("id");
    await prisma.athlete.delete({
      where: { id: Number(athleteId) },
    });

    return c.body(null, 204);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error deleting athlete",cause: error
    });
  }
});

athletes.route("/:id/metrics", metrics);

export default athletes;
