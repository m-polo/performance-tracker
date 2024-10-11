import { zValidator } from "@hono/zod-validator";
import { Athlete } from "@pertrack/database";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  addAthleteSchema,
  deleteAthleteSchema,
  editJsonAthleteSchema,
  editParamAthleteSchema,
  getAllAthletesSchema,
  getAthleteSchema,
} from "../schemas/athlete.schema";
import {
  addAthlete,
  deleteAthlete,
  editAthlete,
  getAthlete,
  getAthletes,
} from "../services/athlete.service";
import metrics from "./metrics.route";
import { checkValidationResult } from "./routes.utils";

const athletes = new Hono()
  .get(
    "",
    zValidator("query", getAllAthletesSchema, ({ success }) =>
      checkValidationResult(success)
    ),
    async (c) => {
      try {
        const { searchText } = c.req.valid("query");
        const athletes: Athlete[] = await getAthletes(searchText);
        return c.json(athletes, 200);
      } catch (error) {
        throw new HTTPException(500, {
          message: "Error getting athletes list",
          cause: error,
        });
      }
    }
  )
  .get(
    "/:id",
    zValidator("param", getAthleteSchema, ({ success }) =>
      checkValidationResult(success)
    ),
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const athlete: Athlete = await getAthlete(id);
        return c.json(athlete, 200);
      } catch (error) {
        throw new HTTPException(500, {
          message: "Error getting athlete",
          cause: error,
        });
      }
    }
  )
  .post(
    "",
    authMiddleware(),
    zValidator("json", addAthleteSchema, ({ success }) =>
      checkValidationResult(success)
    ),
    async (c) => {
      try {
        const athlete: Athlete = c.req.valid("json") as unknown as Athlete;
        const { id } = await addAthlete(athlete);
        return c.json({ ...athlete, id }, 201);
      } catch (error) {
        throw new HTTPException(500, {
          message: "Error adding athlete",
          cause: error,
        });
      }
    }
  )
  .put(
    "/:id",
    authMiddleware(),
    zValidator("json", editJsonAthleteSchema, ({ success }) =>
      checkValidationResult(success)
    ),
    zValidator("param", editParamAthleteSchema, ({ success }) =>
      checkValidationResult(success)
    ),
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const editedAthlete: Athlete = c.req.valid(
          "json"
        ) as unknown as Athlete;
        const athlete: Athlete = await editAthlete(id, editedAthlete);
        return c.json(athlete, 200);
      } catch (error) {
        throw new HTTPException(500, {
          message: "Error editing athlete",
          cause: error,
        });
      }
    }
  )
  .delete(
    "/:id",
    authMiddleware(),
    zValidator("param", deleteAthleteSchema, ({ success }) =>
      checkValidationResult(success)
    ),
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        await deleteAthlete(id);
        return c.body(null, 204);
      } catch (error) {
        throw new HTTPException(500, {
          message: "Error deleting athlete",
          cause: error,
        });
      }
    }
  )
  .route("/:id/metrics", metrics);

export default athletes;
