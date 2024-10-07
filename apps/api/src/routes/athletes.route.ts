import { Athlete } from "@pertrack/database";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { authMiddleware } from "../middlewares/auth.middleware";
import AthleteRepository from "../repositories/athlete.repository";
import metrics from "./metrics.route";

const athletes: Hono = new Hono();
const athleteRepository: AthleteRepository = new AthleteRepository();

athletes.get("", async (c) => {
  try {
    const searchText: string | undefined = c.req.query("searchText");
    const athletes: Athlete[] = await athleteRepository.getAll(searchText);
    return c.json(athletes, 200);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error getting athletes list",
      cause: error,
    });
  }
});

athletes.get("/:id", async (c) => {
  try {
    const athleteId = c.req.param("id");
    const athlete: Athlete = await athleteRepository.getById(Number(athleteId));
    return c.json(athlete, 200);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error getting athlete",
      cause: error,
    });
  }
});

athletes.post("", authMiddleware(), async (c) => {
  try {
    const athlete: Athlete = await c.req.json<Athlete>();
    const { id } = await athleteRepository.add(athlete);
    return c.json({ ...athlete, id }, 201);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error adding athlete",
      cause: error,
    });
  }
});

athletes.put("/:id", authMiddleware(), async (c) => {
  try {
    const athleteId = c.req.param("id");
    const athlete: Athlete = await c.req.json();
    const { id } = await athleteRepository.edit(Number(athleteId), athlete);
    return c.json(id, 200);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error editing athlete",
      cause: error,
    });
  }
});

athletes.delete("/:id", authMiddleware(), async (c) => {
  try {
    const athleteId = c.req.param("id");
    await athleteRepository.remove(Number(athleteId));
    return c.body(null, 204);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error deleting athlete",
      cause: error,
    });
  }
});

athletes.route("/:id/metrics", metrics);

export default athletes;
